import './index2.ts'
import '@/assets/less/index.less'
import { $ } from '@/config/utils'

declare global {
  interface Window { $: any }
}
window.$ = $

class WindowScroll {
  bannerHeight: number
  beforeTop: number
  homeHeaderClsList: string[]
  homeSecondClsList: string[]
  screenHeight: number
  constructor () {
    this.bannerHeight = $('.home-banner').offsetHeight
    this.beforeTop = window.scrollY
    this.screenHeight = window.innerHeight
    this.homeHeaderClsList = [...$('.home-header').classList]
    this.homeSecondClsList = [...$('.home-second').classList]
    this.setInitWindowScroll(this.beforeTop, this.bannerHeight)
    window.addEventListener('scroll', (): void => {
      const afterTop: number = window.scrollY
      if (afterTop > this.beforeTop) {
        this.downScroll(afterTop)
      } else if (afterTop < this.beforeTop) {
        this.upScroll(afterTop)
      }
    })
  }

  // 初始化设置nav和second状态
  setInitWindowScroll (windowInitTop: number, bannerHeight: number): void {
    if (windowInitTop < bannerHeight) {
      this.handleChangeList('home-header', 'transparent', 'add')
      this.handleChangeList('home-second', 'fixed', 'add')
    } else {
      this.handleChangeList('home-header', 'fixed', 'add')
    }
  }

  // 改变class样式
  handleChangeList (className: string, val: string, type?: string): boolean {
    const nameList: string[] = className.split('-')
    const variate: string = nameList[0] + nameList[1][0].toUpperCase() + nameList[1].slice(1)
    let list = this[`${variate}ClsList`]
    let valList = val.split(' ')
    if (type === 'add') {
      valList = valList.filter(item => !list.includes(item))
      if (valList.length === 0) return false
      list.push(...valList)
      $(`.${className}`).classList.add(...valList)
    } else if (type === 'remove') {
      valList = valList.filter(item => list.includes(item))
      if (valList.length === 0) return false
      this[`${variate}ClsList`] = list.filter(item => !valList.includes(item))
      $(`.${className}`).classList.remove(...valList)
    }
  }

  // 向上滚动设置nav和second状态
  upScroll (top: number) {
    if (top > window.innerHeight -20 && top < window.innerHeight + 20) {
      this.handleChangeList('home-header', 'fixed', 'remove')
    }
    if (top > this.bannerHeight) {
      this.handleChangeList('home-header', 'show', 'add')
      this.handleChangeList('home-second', 'fixed', 'remove')
    } else if (top <= this.bannerHeight && top !== 0) {
      this.handleChangeList('home-header', 'fixed show', 'remove')
      this.handleChangeList('home-header', 'transparent', 'add')
      this.handleChangeList('home-second', 'fixed', 'add')
    } else if (top === 0) {
      this.handleChangeList('home-header', 'show', 'add')
    }
  }
  // 向下滚动设置nav和second状态
  downScroll (top: number) {
    if (top < this.bannerHeight) {
      this.handleChangeList('home-header', 'show', 'remove')
      this.handleChangeList('home-second', 'fixed', 'add')
    } else {
      this.handleChangeList('home-header', 'transparent show', 'remove')
      this.handleChangeList('home-header', 'fixed', 'add')
      this.handleChangeList('home-second', 'fixed', 'remove')
    }
    setTimeout(() => {
      this.handleChangeList('home-header', 'white', 'remove')
    }, 250)
  }
}

// 监听滚动是否已经到达白色背景元素上
class ListenScrollArrivalDomBg extends WindowScroll {
  domBgWhiteRange: any[]
  secondDomHasFixed: boolean
  constructor () {
    super()
    this.calculateDomBgWhiteRange(['.home-second', '.home-four'], this.beforeTop)
    this.setNavBg(this.beforeTop)
    window.addEventListener('scroll', () => {
      const afterTop: number = window.scrollY
      this.calculateDomBgWhiteRange(['.home-second', '.home-four'], this.beforeTop)
      if (afterTop < this.beforeTop) {
        this.setNavBg(afterTop)
      }
      this.beforeTop = afterTop
    })
  }
  // 计算白背景的范围
  calculateDomBgWhiteRange (clsList: string[], windowInitTop: number): void {
    if ($('.home-second').classList.contains('fixed') === this.secondDomHasFixed) return
    this.domBgWhiteRange = clsList.map(cls => {
      const dom = $(cls) as HTMLBodyElement
      const domHeight: number = dom.offsetHeight
      const domTop: number = dom.getBoundingClientRect().top
      const left: number = windowInitTop + domTop
      const right: number = windowInitTop + domTop + domHeight
      return [left, right]
    })
  }
  // 改变nav背景颜色
  setNavBg (top: number) {
    let index = 0
    this.domBgWhiteRange.forEach(arr => {
      if (top > arr[0] && top < arr[1]) {
        index++
        this.handleChangeList('home-header', 'white', 'add')
      }
    })
    !index && this.handleChangeList('home-header', 'white', 'remove')
  }
}

class TextAnimation extends ListenScrollArrivalDomBg {
  scrollHeight: number
  allDomList: any[]
  constructor () {
    super()
    this.scrollHeight = window.innerHeight
    const domList = document.querySelectorAll('.isAnimation')
    this.allDomList = []
    domList.forEach((dom) => this.allDomList.push(dom))
    this.handleIsDomShowToScreen()
    window.addEventListener('scroll', () => {
      this.handleIsDomShowToScreen()
    })
  }
  // 需要展示动画的元素是否出现在页面上
  handleIsDomShowToScreen () {
    this.allDomList.forEach(dom => {
      let location = dom.getBoundingClientRect()
      let domHeight = dom.offsetHeight
      if (location.top > -domHeight && location.top < this.scrollHeight) {
        dom.classList.add('textUp')
        dom.classList.remove('isAnimation')
      }
    })
  }
}

window.onload = function () {
  new TextAnimation()
}