import './index.ts'
import '@/assets/less/index.less'
import { $ } from '@/config/utils'

declare global {
  interface Window { $: any }
}
window.$ = $


class listenWindowScroll {
  bannerHeight: number
  windowInitTop: number
  beforeTop: number
  homeHeaderClsList: any
  homeSecondClsList: any
  constructor () {
    this.bannerHeight = $('.home-banner').offsetHeight
    this.beforeTop = this.windowInitTop = window.scrollY
    this.homeHeaderClsList = $('.home-header').classList
    this.homeSecondClsList = $('.home-second').classList
    this.setInitWindowScroll(this.windowInitTop, this.bannerHeight)
    window.addEventListener('scroll', (): void => {
      const afterTop = window.scrollY
      if (afterTop > this.beforeTop) {
        this.downScroll(afterTop)
      } else {
        this.upScroll(afterTop)
      }
      this.beforeTop = afterTop
    })
  }
  // 初始化设置nav和second状态
  setInitWindowScroll (windowInitTop: number, bannerHeight: number): void {
    if (windowInitTop < bannerHeight) {
      this.homeSecondClsList.add('fixed')
    }
    if (windowInitTop === 0) {
      this.homeHeaderClsList.add('transparent', 'show')
    }
  }
  // 向下滚动设置nav和second状态
  upScroll (top: number) {
    if (top > this.bannerHeight || top === 0) {
      this.homeHeaderClsList.add('show')
      console.log(top)
      top === 0 && this.homeHeaderClsList.add('transparent')
    } else {
      this.homeHeaderClsList.remove('show')
    }
    if (top <= this.bannerHeight) {
      this.homeSecondClsList.add('fixed')
      this.homeHeaderClsList.remove('transparent')
    } else {
      this.homeSecondClsList.remove('fixed')
      this.homeHeaderClsList.add('transparent')
    }
  }
  // 向上滚动设置nav和second状态
  downScroll (top: number) {
    this.homeHeaderClsList.remove('show')
    if (top >= this.bannerHeight) {
      this.homeSecondClsList.remove('fixed')
    } else {
      this.homeSecondClsList.add('fixed')
    }
  }
}

new listenWindowScroll()

/* function setInitWindowScroll (windowInitTop: number, bannerHeight: number): void {
  if (windowInitTop < bannerHeight) {
    $('.home-second').classList.add('fixed')
  }
  if (windowInitTop === 0) {
    $('.home-header').classList.add('transparent', 'show')
  }
}

function listenWindowScroll1(upFn: Function, downFn: Function): void {
  let beforeTop = window.scrollY
  const bannerHeight: number = $('.home-banner').offsetHeight
  setInitWindowScroll(beforeTop, bannerHeight)
  window.addEventListener('scroll', (): void => {
    const afterTop = window.scrollY
    if (afterTop > beforeTop) {
      downFn(afterTop, bannerHeight)
    } else {
      upFn(afterTop, bannerHeight)
    }
    beforeTop = afterTop
  })
}

listenWindowScroll1((top: number, bannerHeight: number): void => {
  if (top > bannerHeight || top === 0) {
    $('.home-header').classList.add('show')
    top === 0 && $('.home-header').classList.add('transparent')
  } else {
    $('.home-header').classList.remove('show')
  }
  if (top <= bannerHeight) {
    $('.home-second').classList.add('fixed')
    $('.home-header').classList.remove('transparent')
  }
  if (top > bannerHeight) {
    $('.home-header').classList.add('transparent')
  }
}, (top: number, bannerHeight: number): void => {
  $('.home-header').classList.remove('show')
  if (top >= bannerHeight) {
    $('.home-second').classList.remove('fixed')
  }
}) */