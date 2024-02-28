function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

function lowestCommonAncestor(root, p, q) {
    if (root === null) {
        return null;
    }

    if (root === p || root === q) {
        return root;
    }

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left !== null && right!== null) {
        return root;
    }


    else if (left !== null || right!== null) {
        return left || right;
        
    }

    else if (left === null && right === null) {
        return null;
    }
}

function lowestCommonAncestorShortHand(root, p, q){
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    return left && right ? root : left || right;

}

module.exports = { TreeNode, lowestCommonAncestor };