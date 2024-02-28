/** TreeNode: node for a general tree. */
class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    if (!this.root) return 0;

    let total = this.root.val;

    // Helper function for recursive value summation
    function sumHelper(node) {
      for (let child of node.children) {
        total += child.val;
        if (child.children.length > 0) {
          sumHelper(child); // Recurse for child's subtrees
        }
      }
    }

    sumHelper(this.root);
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    if (!this.root) return 0;

    let count = this.root.val % 2 === 0 ? 1 : 0;

    // Helper function for counting even nodes
    function countEvenHelper(node) {
      for (let child of node.children) {
        if (child.val % 2 === 0) count++;
        if (child.children.length > 0) {
          countEvenHelper(child); // Recurse for child's subtrees
        }
      }
    }

    countEvenHelper(this.root);
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    if (!this.root) return 0;

    let count = this.root.val > lowerBound ? 1 : 0;

    // Helper function for counting nodes greater than the bound
    function countGreaterHelper(node) {
      for (let child of node.children) {
        if (child.val > lowerBound) count++;
        if (child.children.length > 0) {
          countGreaterHelper(child); // Recurse for child's subtrees
        }
      }
    }

    countGreaterHelper(this.root);
    return count;
  }
}

module.exports = { Tree, TreeNode };
