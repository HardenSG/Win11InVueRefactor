import {
  type SchedulerInter,
  type CurrentShowComponentInter,
  type CustomComponentInter,
  normalizeArray,
  isInteger,
  catchTargetComponent,
  filterGarbageComponent,
  CurrentShowComponent,
} from 'utils'
import type { UseSchedulerActions } from '.'

const actions: UseSchedulerActions = {
  cacheScheduler(scheduler: SchedulerInter) {
    this.scheduler = scheduler
    return this
  },
  updateCurrentShowComponent(components: CurrentShowComponentInter[]): void {
    ;(this.scheduler as SchedulerInter).updateCurrentShowComponent(normalizeArray(components))
  },
  installComponents(component: CustomComponentInter): void {
    ;(this.scheduler as SchedulerInter).installComponents(component)
  },
  syncHideComponentData(uuid: number, isRemove: boolean): boolean {
    if (!isInteger(uuid)) {
      throw new Error('RECEIVER PARAMS NOT A NUMBER')
    }

    // MARK: remove console
    console.log('Hide --> ', uuid)

    const targetComponent = catchTargetComponent<CurrentShowComponentInter>(
      this.scheduler.currentShowComponent,
      'uuid',
      uuid
    )

    if (!targetComponent) {
      console.warn("CAN'T FIND THE uuid OF COMPONENT, YOU SHOULD CHECK THE uuid FROM YOU PASS")
      return false
    }

    /// / change property
    targetComponent.component.UpdateIndex(-1)
    targetComponent.UpdateIsHide(isRemove ? false : !isRemove)
    if (isRemove) {
      targetComponent.component.UpdateIsMount(false)
      const composeCurrentShowComponent = filterGarbageComponent<CurrentShowComponentInter>(
        this.currentShowComponent,
        'uuid',
        uuid
      )
      this.updateCurrentShowComponent(composeCurrentShowComponent)
    }

    // adjust component order call scheduler methods
    this.scheduler.adjustComponentTier()

    // sync currentShowComponent
    // NOTE: 我认为即使是最小化的组件也应该保存在currentShowComponent中
    //       这show，所代表的含义是是否存在节点
    return targetComponent.isHide
  },
  syncShowComponentData(uuid: number, isTaskBar: boolean): boolean {
    if (!isInteger(uuid)) {
      throw new Error('RECEIVER PARAMS NOT A NUMBER')
    }

    // MARK: remove console
    console.log('Show --> ', uuid)

    const targetComponent = catchTargetComponent<CustomComponentInter>(
      this.scheduler.components,
      'uuid',
      uuid
    )

    if (!targetComponent) {
      console.warn("CAN'T FIND THE uuid OF COMPONENT, YOU SHOULD CHECK THE uuid FROM YOU PASS")
      return false
    }

    const isShow = targetComponent.isMount && targetComponent.customZIndex > 0

    /// / change property
    /// / 再次点击taskbar会有隐藏的效果
    if (isTaskBar && isShow) {
      targetComponent.UpdateIndex(-1)
    } else {
      /// TODO: need call adjust trie function
      targetComponent.UpdateIndex(uuid + 1)
    }
    targetComponent.UpdateIsMount(true)

    // get currentShowComponent the aim to judge the component exist
    const currentShowComponent = catchTargetComponent<CurrentShowComponentInter>(
      this.currentShowComponent,
      'uuid',
      uuid
    )

    // if exist -> Sync currentShowComponent
    if (currentShowComponent) {
      currentShowComponent.UpdateIsHide(isShow)
      currentShowComponent.UpdateOrder(Date.now())
      return isShow
    }

    // not exist -> create CurrentShowComponent object
    const currentShow = new CurrentShowComponent(
      uuid,
      targetComponent,
      Date.now(),
      isShow,
      targetComponent.IsFixTaskBar
    )

    // NOTE: duplicate removal
    // const composeCurrentShowComponent = filterGarbageComponent<CurrentShowComponentInter>(
    //   this.currentShowComponent,
    //   'uuid',
    //   uuid
    // )
    this.updateCurrentShowComponent([...this.currentShowComponent, currentShow])

    return isShow
  },
  toggleZIndexComponent(uuid: number): void {
    const targetComponent = catchTargetComponent<CurrentShowComponentInter>(
      this.scheduler.currentShowComponent,
      'uuid',
      uuid
    )

    targetComponent?.UpdateIsHide(false)
    targetComponent?.component.UpdateIndex(uuid + 1)
  },
}

export default { actions }
