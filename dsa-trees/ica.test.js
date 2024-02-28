const { lowestCommonAncestor } = require("./ica");

describe("lowestCommonAncestor", () => {
  let root;
  beforeEach(() => {
    root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
  });

  it("should return null if root is null", () => {
    expect(lowestCommonAncestor(null, root.left, root.right)).toBeNull();
  });

  it("should return the root if root is one of the nodes", () => {
    expect(lowestCommonAncestor(root, root.left, root.right)).toBe(root);
  });

  it("should return lowest common ancestor if found", () => {
    expect(lowestCommonAncestor(root, root.left.left, root.right.right)).toBe(
      root
    );
  });

  it("should return null if nodes not found", () => {
    const p = new TreeNode(8);
    const q = new TreeNode(9);
    expect(lowestCommonAncestor(root, p, q)).toBeNull();
  });

  it("should handle nodes in different subtrees", () => {
    expect(lowestCommonAncestor(root, root.left, root.right.left)).toBe(root);
  });
});
