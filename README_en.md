# System refactoring plan

[Chinese](./README.md)

## resume

[origin projects](https://github.com/HardenSG/Win11-in-Vue) for the 4th byte beating youth system front-end premium project, my team took three weeks to complete the zero component library ` Win11 In Vue ` development, as the main developer, I contributed about 3/5 of the commit.

Occasionally back to save code, feel that some places written is not good, such as the content of the more dead; High code repetition, poor reuse; Without much consideration of objective factors such as performance; Registration registration mode is rigid and ugly.... .

So i want to refactor it and learn from it.

+ code tries to write logic in the `OOP` + `FP` programming paradigm.
+ System transition from single system to `monorepo`, template depends on my `cli` setup
+ Pay attention to subcontracting, delete meaningless redundant file layering
+ Pay attention to universality, reduce the writing of repeated code, can practice `HOC` or `HOF` to improve reusability
+ During the writing process, think about the data flow, reject the meaningless repeated data input, detect the wrong data transfer in time, and take the data flow as the guiding basis of components and even the layering of document subcontracting

## stack

+ `Vite`
+ `Typescript`
+ `Vue3`
+ `Pinia`
+ `VueRouter`

## Evolution direction of architecture

Application registration changes to manual export automatic registration. Applications are exported from `scheduler/apps` `packages/ apps` that third-party developers only need to write applications in.

In theory: Third-party developers can use `npm` third-party package for application installation. You only need to import `scheduler/apps`. The system will provide some data and inject it into the components written by the third party by `provide` dependency injection form. For more component authoring rules, please refer to the 'app' Development Specification [Component Authoring Specification](packages/app/README.md)

The exported component is managed by the unified `Scheduler`, so the `Scheduler` is initialized and mounted at the beginning of the `Root(View/Home)` component creation. These components are processed by the information in the scheduler, and the result is an array of components. Therefore, the system will be directly traversed for mounting

```javascript
{Object.keys(Applications).map((key, idx) => {
    var WinApp = Applications[key];
    return <WinApp key={idx} />;
})}
```

+ [x] components should be pseudo-mounted and should not be rendered when they do not need to be, otherwise it will undoubtedly drag down the first screen rendering, so remove all components that do not appear and do not render into the `dom tree`

+ [x] Links all components to `taskBar` and controls the display of the corresponding component when clicked. This is done by `nomalize HOC`, which means that all applications are actually going to be handled through `HOC`, so that the component is managed by `HOC`, and each component starts a new `HOC`, so they don't interfere with each other

### Refactor `ToolsBar`

+ [x] The component minimization should not be hidden, but the hierarchy, because frequent firing of 'display: none' can cause performance problems
+ [x] When the component is closed, you need to consider whether to do 'display: none', since it may not be turned on again for a short time
+ [x] The component shutdown is minimized by calling a 'scheduler' method

+ [ ] `TODO` : `ToolBar` as a public component, in order to better maintainability should practice `OOP` development, so the following work will focus on refactor ToolBar component and optimization it

### How to do a good global linkage?

> It is difficult to meet the requirement only by relying on the reference feature of the object. If it relies on responsive, how can `scheduler` data flow to the global?

+ [] If we used `props` it would mean that all the components would have to be changed, which would obviously violate the open/close principle
+ [] If you use dependency injection, you can still share data across components, and you can ensure that all components can receive it properly, because they belong to the same dependency chain, but the performance burden is high, if there are large-scale components, it is difficult to guarantee the performance.
  + The performance burden here refers to the fact that the same data is also consumed by the top-level `App's` own components, so the injected dependency depth may be more than 3 layers (passing over 3 layers of dependency injection may cause serious performance problems).
  + Therefore uncertainty is a factor of instability. However, it is a good choice to share data between the system and the application, because it not only breaks through the communication barrier between the system, but also controls the data flow in the top-level dependency chain. However, this needs to be complied by the developers themselves
+ [x] uses `store` to share data across components
+ Note that cross-component application delivery here refers to the system, including the system's built-in `baseComponent` data sharing according to the state management tool.
+ `TODO` : `App` level applications, initially want to rely on dependency injection.

### Refactor `taskBar`

+ The bottom bar is fixed via `Scheduler` - `IsFixTaskBar` depending on your configuration
+ ~~bottom bar to linkage desktop through `HOC`~~
+ `taskBar` also needs to consider whether the currently open `app` is fixed. If it is fixed, open it in place; if not, open it at the end, sort it by timestamp (UI layer digest).

+ [x] `ToolsBar` linkage `pinia.components` implements hierarchy switching, which requires component autonomy, so it is a best practice to build custom component classes using `OOP` here

`taskbar` consumes `currentShowTaskbar` synchronously, and the data is sorted by timestamp
`desktop` to consume `scheduler.components` data, you can directly consume `pinia components`

**Multi - directional linkage is the foundation of system interconnection**

---

## Continues to evolve

### Why continue to evolve?

If `TaskBar` continues with `HOC`, then the target application will need to be opened twice at the same time, which is not a good outcome

### How to manage components uniformly and only render once?

My idea is to retain `scheduler` scheme and `HOC` scheme can also be retained, because component management with `HOC` scheme is more unified and fine-grained, and each `HOC` plays its own role

taskBar would have to make concessions, so instead of continuing with `HOC`, `taskBar` would render an icon

Export an instance of the `CustomComponent` class in a self-managed way for each component, with built-in component information on which `taskBar` can be rendered

### How can I sync `taskbar` styles when components are hidden

It's easy to remember, because if it's displaying, it must be in `currentShowComponent`, so I need to do something in `taskBar`

#### How to operate?

There are different ways to think about it
The display data source for > `taskBar` is divided into two parts: `fixTaskBarComponent` and `currentShowComponent`
> So consider:

1. If the task is `fixTaskBarComponent` , it displays in place regardless of `order` or not
2. If the tasks are not displayed in `fixTaskBarComponent`, they need to be sorted according to `order`. The smaller the `order` is, the closer it is to the left.

So rendering also relies on the `currentShowComponent`, which is still present in the `currentShowComponent` for hidden (not closed) components, so it needs to be determined by the `isHide` (which needs to be localized). The classes applied to the currently displayed and hidden content are different such as the long blue bar shown and the white bar hidden

Therefore, on the computed phase of `components/taskbar.vue`, we have to divide the tasks that are not `fixTaskBarComponent`. This part needs to be sorted by `order`.

Anything that isn't `fixTaskBarComponent` is handled directly according to isHide

## About app

1. First raise a question: If a custom application needs `store` or `other data` for the linkage between third-party apps, how to achieve this?

> This requires step by step thinking about why this is necessary and what are some examples of such application scenarios; How to achieve cross-application data sharing, how to achieve cross-application data changes....

I believe that there is definitely more than one solution to how to share data between components, including the three ways of implementing the above thought: `props`, `store` , `provide` there must be other solutions that can be implemented. However, in either case, the following principles need to be observed:

+ Whether reasonable and secure data flow is complied with
+ code accessible security: (cannot open all private data to users)
+ Complexity of code and data flow
+...

---

1. As for `props`, I don't think it's a good choice, although you can customize whether to receive `props` or not, but at the beginning of the mounting of a component, the center should be placed on them, and it's not possible to insert third party data into another `app` `props`
2. In the case of `store`, consider whether it is necessary to introduce a new package, and although the `store data` can be customized by the `app`, then the import of the `store` must be exported to the third party `app's store` via a `core` `repo` file, or, Do you think it's good to introduce a third-party `app` directly into another `app's` store?

Therefore, I think the best solution is still in the form of `dependency injection`. The application can introduce the exposed data of other `apps` conveniently. It only needs simple `inject` to get the data you want. At the same time, during the mounting period of components, it is necessary to traverse the components to be mounted and `provide` the exposed data when detected. Since components need to be mounted to `core/Home/index.vue` in the end, all component data sharing can be realized. To do this, however, you need to modify the `CustomComponent` and update the logic of `HOC`.
> However, the following should be noted when writing
The name + `provide` needs to indicate the component name and user-defined data name, which can be separated by the following lines, such as: `Folder_FolderData`. Users need to indicate when using it to prevent confusion, so the data name needs to be determined by RE during the registration period
+....

To be continued....
