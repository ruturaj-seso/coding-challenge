// MinHeap
// @vibertthio (github.com/vibertthio)

function Node(val, key) {
  this.val = val;
  this.key = key;
}

function MinHeap() {
  this.data = [];
}

MinHeap.prototype.swap = function (i, j) {
  const temp = this.data[i];
  this.data[i] = this.data[j];
  this.data[j] = temp;
};

MinHeap.prototype.heapifyUp = function () {
  let index = this.data.length - 1;
  let node = this.data[index];

  while (index > 0) {
    const parentIndex = Math.floor((index - 1) / 2);
    const parent = this.data[parentIndex];

    if (parent.key > node.key) {
      this.swap(index, parentIndex);
    } else {
      break;
    }
    index = parentIndex;
    node = this.data[parentIndex];
  }
};

MinHeap.prototype.heapifyDown = function () {
  let index = 0;
  let node = this.data[index];

  while (index * 2 + 1 < this.data.length) {
    let leftIsSmaller = true;
    if (index * 2 + 2 < this.data.length) {
      leftIsSmaller = this.data[index * 2 + 1].key <= this.data[index * 2 + 2].key;
    }
    const childIndex = leftIsSmaller ? index * 2 + 1 : index * 2 + 2;
    const child = this.data[childIndex];
    if (node.key > child.key) {
      this.swap(index, childIndex);
    } else {
      break;
    }
    index = childIndex;
    node = this.data[childIndex];
  }
};

MinHeap.prototype.insert = function (val, key) {
  const node = new Node(val, key);
  this.data.push(node);
  this.heapifyUp();
};

MinHeap.prototype.pop = function () {
  if (this.data.length === 0) {
    return null;
  }
  this.swap(0, this.data.length - 1);
  const node = this.data.pop();

  this.heapifyDown();
  return node;
};

MinHeap.prototype.size = function () {
  return this.data.length;
};

module.exports = MinHeap;
