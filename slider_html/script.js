const slider = document.getElementById('slider')
const sliderItems = document.getElementById('slides')
const dots = document.getElementById('dots')
const prev = document.getElementById('prev')
const next = document.getElementById('next')

const stepAnimation = 5
const stepFastAnimation = 20

function slide(items, prev, next, dots) {
  let posInitial
  const slides = items.getElementsByClassName('slide')
  const slidesLength = slides.length
  const slideSize = items.getElementsByClassName('slide')[0].offsetWidth
  const firstSlide = slides[0]
  const lastSlide = slides[slidesLength - 1]
  const cloneFirst = firstSlide.cloneNode(true)
  const cloneLast = lastSlide.cloneNode(true)
  let index = 0
  let allowShift = true

  createDot(slides.length)
  // Clone first and last slide
  items.appendChild(cloneFirst)
  items.insertBefore(cloneLast, firstSlide)

  prev.addEventListener('click', function () {
    shiftSlide(-1)
  })
  next.addEventListener('click', function () {
    shiftSlide(1)
  })
  dots.addEventListener('click', dotClick)

  function shiftSlide(dir) {
    if (allowShift) {
      posInitial = items.offsetLeft

      if (dir == 1) {
        index++
        animation(items, posInitial, posInitial - slideSize, dir)
      } else if (dir == -1) {
        index--
        animation(items, posInitial, posInitial + slideSize, dir)
      }
    }

    allowShift = false
  }

  function dotClick(e) {
    if (!e.target.classList.contains('dot')) return
    const dotIndex = Number(e.target.dataset.index)

    if (allowShift) {
      setActiveDot(dotIndex)
      posInitial = items.offsetLeft
      const diff = dotIndex - index
      const finish = posInitial - diff * slideSize
      animation(items, posInitial, finish, diff, stepFastAnimation)
      index += diff
    }

    allowShift = false
  }

  function createDot(count) {
    for (let i = 0; i < count; ++i) {
      const dot = document.createElement('div')
      dot.classList.add('dot', i === 0 && 'active')
      dot.setAttribute('data-index', i)
      dots.append(dot)
    }
  }

  function setActiveDot(dotIndex) {
    const activeDot = dots.getElementsByClassName('dot active')[0]
    const newActiveDot = dots.getElementsByClassName('dot')[dotIndex]
    activeDot.classList.remove('active')
    newActiveDot.classList.add('active')
  }

  //   function animation(items, posInitial, finish, dir, step = stepAnimation) {
  //     function req() {
  //       if (dir > 0 ? posInitial >= finish : posInitial <= finish) {
  //         items.style.left = posInitial + 'px'
  //         posInitial += dir > 0 ? -step : step
  //         requestAnimationFrame(req)
  //       } else {
  //         checkIndex()
  //       }
  //     }
  //     requestAnimationFrame(req)
  //   }

  function animation(items, posInitial, finish, dir, step = stepAnimation) {
    const theTimer = setInterval(() => {
      if (dir > 0 ? posInitial >= finish : posInitial <= finish) {
        items.style.left = posInitial + 'px'
        posInitial += dir > 0 ? -step : step
      } else {
        clearInterval(theTimer)
        checkIndex()
      }
    }, stepAnimation)
  }

  function checkIndex() {
    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + 'px'
      index = slidesLength - 1
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + 'px'
      index = 0
    }

    setActiveDot(index)
    allowShift = true
  }
}

slide(sliderItems, prev, next, dots)
