import { gsap } from 'gsap'
import barba from '@barba/core'

const select = (selector) => document.querySelector(selector)
const selectAll = (selector) => document.querySelectorAll(selector)

const menuButton = select('.menubtn')
const opacityElement = selectAll('.opacityelement')
const menuItem = selectAll('.menuitem')
const gradient = select('#gradient-canvas')
const line_1 = select('#line_1')
const line_2 = select('#line_2')
const container = selectAll('.menu-container')
const backdrop = selectAll('.menu-backdrop')
const arrow = selectAll('.arrow')
const keybind = selectAll('.keybind')

let isToggled = false
let isAnimating = false

const easeConfig = { ease: 'expo.out' }
const staggerConfig = {
    stagger: {
        grid: 'auto',
        from: 'start',
        axis: 'y',
        ease: 'linear',
        each: 0.2,
        amount: 0.42,
    },
}

const toggleOpacity = (targets, opacity, duration, delay) => {
    gsap.to(targets, { opacity, duration, delay })
}

const toggleRotationAndPosition = (target, rotation, x, y, duration) => {
    gsap.to(target, { ...easeConfig, rotation, x, y, duration })
}

const toggleHeight = (
    target,
    height,
    borderRadius,
    duration,
    delay,
    onComplete
) => {
    gsap.to(target, {
        height,
        borderRadius,
        ...easeConfig,
        duration,
        delay,
        onComplete,
    })
}

function handleClick() {
    if (!isAnimating) {
        isAnimating = true
        menuButton.setAttribute('disabled', 'true')

        if (!isToggled) {
            toggleOpacity(opacityElement, 0, 1, 0)
            gsap.to(menuItem, {
                opacity: 1,
                pointerEvents: 'all',
                duration: 1.5,
                delay: 1.8,
                x: 90,
                ...easeConfig,
                zIndex: 20,
                ...staggerConfig, 
                onComplete: () => {
                    isAnimating = false
                    menuButton.removeAttribute('disabled')
                }
            });
            toggleOpacity(backdrop, 0.25)
            toggleHeight(container, '82.8%', 0, 1.6, 1)
            toggleRotationAndPosition(line_1, 45, -4.5, 1, 1)
            toggleOpacity(keybind, 1, 1)
            toggleRotationAndPosition(line_2, -45, -4, -8, 1)
            gsap.to(gradient, {
                ...easeConfig,
                scaleX: 2,
                duration: 2,
                delay: 0,
            })
            isToggled = true
        } else {
            gsap.to(menuItem, {
                opacity: 0,
                duration: 4,
                delay: 0.09,
                x: -600,
                zIndex: 5,
                ...easeConfig,
                ...staggerConfig,
            })
            toggleHeight(container, '0', 0, 1.5, 1.2, () => {
                isAnimating = false
                menuButton.removeAttribute('disabled')
                toggleOpacity(backdrop, 1)
            })
            toggleOpacity(opacityElement, 1, 0.5, 2.5)
            gsap.to(gradient, {
                ...easeConfig,
                scaleX: 1,
                duration: 1.5,
                delay: 2.5,
            })
            toggleRotationAndPosition(line_1, 0, 0, 0, 1)
            toggleRotationAndPosition(line_2, 0, 0, 0, 1)
            toggleOpacity(keybind, 0, 1)
            isToggled = false
        }
    }
}

if (!isToggled) {
    gsap.set(opacityElement, { opacity: 1, duration: 0 })
    gsap.set(menuItem, { pointerEvents: 'none', opacity: 0, x: -600 })
    gsap.set(keybind, { opacity: 0 })
}

menuButton.addEventListener('click', handleClick)
