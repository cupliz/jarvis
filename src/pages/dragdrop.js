/*
Timebox at 60 minutes
Instructions: 
1) Render the below array of pictures using React (you can change them if you want)
2) Display these images on a responsive layout of your choice
3) Implement drag and drop functionality where one image can move to the place of the other
4) Implement a popup/modal window after dragging an image to confirm the action (Do you want to replace Image A for image B ?)

Extra points for: clear code, styles and creativity, animations, tests, custom CSS
*/

import React, { useState, useRef, createRef } from 'react'
import './test.css'
const pictures = [
  "https://image.flaticon.com/icons/svg/206/206898.svg",
  "https://image.flaticon.com/icons/svg/206/206865.svg",
  "https://image.flaticon.com/icons/svg/206/206877.svg",
  "https://image.flaticon.com/icons/svg/206/206880.svg",
  "https://image.flaticon.com/icons/svg/306/306009.svg",
  "https://image.flaticon.com/icons/svg/305/305974.svg",
  "https://image.flaticon.com/icons/svg/305/305978.svg",
  "https://image.flaticon.com/icons/svg/305/305994.svg",
]
export default () => {
  const [images, setImages] = useState(pictures)
  const [type, setType] = useState('swap')
  const refs = useRef(pictures.map(createRef))
  const allowDrop = (ev) => {
    ev.preventDefault()
  }
  const drag = (i, e) => {
    e.dataTransfer.setData('text', i)
  }
  const drop = (dst, e) => {
    e.preventDefault()
    const src = e.dataTransfer.getData('text')
    const confirmed = window.confirm(`Do you want to ${type} Image ${parseInt(src) + 1} for image ${parseInt(dst) + 1} ?`)
    if (confirmed) {
      if (type === 'swap') {
        const swapped = images.reduce((op, cur) => {
          if (cur === images[src]) op.push(images[dst]);
          else if (cur === images[dst]) op.push(images[src]);
          else op.push(cur);
          return op;
        }, [])
        setImages(swapped)
      }
      if (type === 'replace') {
        images.splice(dst, 1, images[src])
        images.splice(src, 1)
        setImages(Object.assign([], images))
      }
    }
  }
  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container text-center">
          In light of the Coronavirus pandemic, we are providing full disinfection cleans to all clients at no added charge.
          See everything we’re doing to keep our communities safe here
        </div>
      </nav>
      <div className="container">
        <div className="row mt-4 mb-4">
          <div className="col-6">
            <button className={`btn btn-${type === 'replace' ? 'primary' : 'secondary'} btn-md btn-block`}
              onClick={() => setType('replace')}>Replace</button>
          </div>
          <div className="col-6">
            <button className={`btn btn-${type === 'swap' ? 'primary' : 'secondary'} btn-md btn-block`}
              onClick={() => setType('swap')}>Swap</button>
          </div>
        </div>
        <div className="row">
          {
            images.map((img, i) => {
              return <div key={i} className="col-3 box" >
                <img
                  className="img-fluid"
                  src={img}
                  ref={refs.current[i]}
                  draggable="true"
                  onDragStart={e => drag(i, e)}
                  onDragOver={e => allowDrop(e)}
                  onDrop={e => drop(i, e)}
                  alt=""
                />
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}
