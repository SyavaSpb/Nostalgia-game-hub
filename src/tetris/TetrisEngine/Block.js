import GameObject from 'cell-games-front/GameObject.js'
// const GameObject = require('cell-games-front/GameObject.js')

const blocksShape = [
  //I
  [
    [
      {j: 0, i: -1},
      {j: 0, i: 0},
      {j: 0, i: 1},
      {j: 0, i: 2}
    ],
    [
      {j: -2, i: 0},
      {j: -1, i: 0},
      {j: 0, i: 0},
      {j: 1, i: 0}
    ],
    [
      {j: 0, i: 1},
      {j: 0, i: 0},
      {j: 0, i: -1},
      {j: 0, i: -2}
    ],
    [
      {j: -1, i: 0},
      {j: 0, i: 0},
      {j: 1, i: 0},
      {j: 2, i: 0}
    ]
  ],
  //T
  [
    [
      {j: 0, i: 0},
      {j: -1, i: 0},
      {j: 1, i: 0},
      {j: 0, i: 1}
    ],
    [
      {j: 0, i: -1},
      {j: 0, i: 0},
      {j: 0, i: 1},
      {j: -1, i: 0}
    ],
    [
      {j: -1, i: 0},
      {j: 0, i: 0},
      {j: 1, i: 0},
      {j: 0, i: -1}
    ],
    [
      {j: 0, i: -1},
      {j: 0, i: 0},
      {j: 0, i: 1},
      {j: 1, i: 0}
    ]
  ],
  //L
  [
    [
      {j: 0, i: -1},
      {j: 0, i: 0},
      {j: 0, i: 1},
      {j: 1, i: 1}
    ],
    [
      {j: -1, i: 0},
      {j: -1, i: 1},
      {j: 0, i: 0},
      {j: 1, i: 0}
    ],
    [
      {j: -1, i: -1},
      {j: 0, i: -1},
      {j: 0, i: 0},
      {j: 0, i: 1}
    ],
    [
      {j: -1, i: 0},
      {j: 0, i: 0},
      {j: 1, i: 0},
      {j: 1, i: -1}
    ]
  ],
  //J
  [
    [
      {j: 0, i: -1},
      {j: 0, i: 0},
      {j: 0, i: 1},
      {j: -1, i: 1}
    ],
    [
      {j: 1, i: 0},
      {j: 0, i: 0},
      {j: -1, i: 0},
      {j: -1, i: -1}
    ],
    [
      {j: 0, i: 1},
      {j: 0, i: 0},
      {j: 0, i: -1},
      {j: 1, i: -1}
    ],
    [
      {j: -1, i: 0},
      {j: 0, i: 0},
      {j: 1, i: 0},
      {j: 1, i: 1}
    ]
  ],
  //o
  [
    [
      {j: 0, i: 0},
      {j: 1, i: 0},
      {j: 0, i: 1},
      {j: 1, i: 1}
    ]
  ]
];

export class Block extends GameObject {
  constructor(ind, image) {
    super(ind)
    this.indShape = 0
    this.bodies = blocksShape[Math.floor(Math.random() * blocksShape.length)]
      .map(shape => {
        const body = new Array()
        shape.forEach(cellInd => {
          body.push(this.newCell(cellInd, image))
        })
        return body
      })

    this.body = this.bodies[this.indShape]
  }
  turnBlock() {
    this.indShape = (this.indShape + 1) % this.bodies.length
    this.body = this.bodies[this.indShape]
  }
}
