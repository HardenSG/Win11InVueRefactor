import { hasOwn, isInteger } from '../../baseHandles'
import { catchTargetComponent, filterGarbageComponent, isCustomComponent } from '../../component'
import type { CustomComponentInter, CurrentShowComponentInter, SchedulerInter } from '../types'

export default class Scheduler implements SchedulerInter {
  components: CustomComponentInter[]
  fixTaskBarComponent: CustomComponentInter[]
  currentShowComponent: CurrentShowComponentInter[]
  size: number
  maxTrie: number

  constructor(VNodes: any) {
    // MARK: remove console
    console.log(VNodes)

    this.components = []
    this.fixTaskBarComponent = []
    this.currentShowComponent = []
    this.size = 0
    this.maxTrie = 1

    this.Init(VNodes)
  }

  Init(CustomComponents: any) {
    this.handleComponent(CustomComponents)
    this.handlesAddFixTaskBarComponent()
    // this.size = this.components.length;
  }
  handleComponent(CustomComponents: any) {
    for (const k in CustomComponents) {
      if (hasOwn(CustomComponents, k)) {
        const v = CustomComponents[k] as CustomComponentInter
        const isCustom = isCustomComponent(v)
        if (!isCustom) {
          console.warn(
            `【安装失败】：你注册的组件 ${k} 并不是一个真正的app，检测是否导出错误，或者提供了错误的信息`,
          )

          return
        }

        v.SetUUid(this.size++)
        this.components.push(v as CustomComponentInter)
      }
    }
  }
  handlesAddFixTaskBarComponent() {
    this.components.forEach((type) => {
      if (type.IsFixTaskBar) {
        this.addFixTaskBarComponent(type)
      }
    })
  }
  addFixTaskBarComponent(component: CustomComponentInter) {
    this.fixTaskBarComponent.push(component)
  }
  removeTaskBarComponent(uuid: number) {
    this.fixTaskBarComponent = filterGarbageComponent<CustomComponentInter>(
      this.fixTaskBarComponent,
      'uuid',
      uuid,
    )
  }
  removeComponent(uuid: number) {
    this.components = filterGarbageComponent<CustomComponentInter>(this.components, 'uuid', uuid)
  }
  removeCurrentShowComponent(uuid: number) {
    this.currentShowComponent = filterGarbageComponent<CurrentShowComponentInter>(
      this.currentShowComponent,
      'uuid',
      uuid,
    )
  }
  installComponents(component: CustomComponentInter) {
    const isCustom = isCustomComponent(component)
    if (!isCustom) {
      console.warn(`【安装失败】：不能安装一个不是app的组件 ${component}，检查是否code错误`)
      return
    }

    if (component.IsFixTaskBar) {
      this.addFixTaskBarComponent(component)
    }
    this.components.push(component)
  }
  uninstallComponent(uuid: number) {
    if (isInteger(uuid)) {
      throw new Error('YOU MUST REMOVE COMPONENT BY uuid, THE uuid IS A Number')
    }

    const target = catchTargetComponent<CustomComponentInter>(this.components, 'uuid', uuid)
    if (!target) {
      console.warn('THE uuid OF COMPONENT NOT EXIST')
      return false
    }

    const isInCurrentShowComponent = catchTargetComponent(this.currentShowComponent, 'uuid', uuid)
    if (isInCurrentShowComponent) {
      console.error(`【卸载失败】：你所要卸载的app正在后台运行中，请先退出以便下一步`)
      return false
    }

    if (target.IsFixTaskBar) {
      this.removeTaskBarComponent(uuid)
    }
    this.removeComponent(uuid)

    return true
  }
  updateCurrentShowComponent(component: CurrentShowComponentInter[]) {
    this.currentShowComponent = component
  }

  judgeMaxTrie(customZIndex: number) {
    return customZIndex >= this.maxTrie
  }

  // MARK: feature
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateComponent() {}

  // MARK: feature
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  adjustComponentTier(uuid: number) {}
}
