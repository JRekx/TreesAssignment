
describe("Tree", () => {
  describe("sumValues", () => {
    it("returns 0 for empty tree", () => {
      const tree = new Tree();
      expect(tree.sumValues()).toBe(0);
    });

    it("sums values in tree with one node", () => {
      const root = new TreeNode(5);
      const tree = new Tree(root);
      expect(tree.sumValues()).toBe(5);
    });

    it("sums values in tree with multiple nodes", () => {
      const root = new TreeNode(1);
      root.children.push(new TreeNode(2), new TreeNode(3));
      const tree = new Tree(root);
      expect(tree.sumValues()).toBe(6);
    });
  });

  describe("countEvens", () => {
    it("returns 0 for empty tree", () => {
      const tree = new Tree();
      expect(tree.countEvens()).toBe(0);
    });

    it("counts evens in tree with one node", () => {
      const root = new TreeNode(2);
      const tree = new Tree(root);
      expect(tree.countEvens()).toBe(1);
    });

    it("counts evens in tree with multiple nodes", () => {
      const root = new TreeNode(1);
      root.children.push(new TreeNode(2), new TreeNode(3));
      const tree = new Tree(root);
      expect(tree.countEvens()).toBe(1);
    });
  });
});
