preorder = ''

def read_data(input_file):
    with open(input_file, 'r') as file:
        file_data = file.read()
    
    parse_data(file_data)

def parse_data(file_data):
    tree_Nodes = []
    splitData = file_data.split('\n')

    for line in splitData:
        if line == '':
            continue
        if '*' in line:
            tree_Nodes.append(line.replace('*', ''))
            tree_Nodes.reverse()
            create_Tree(tree_Nodes)
            tree_Nodes = []
        
        elif '$' in line:
            tree_Nodes.append(line.replace('$', ''))
            tree_Nodes.reverse()
            create_Tree(tree_Nodes)
        else:
            tree_Nodes.append(line)


def create_Tree(tree_Nodes):
    global preorder
    root = 0
    for level in tree_Nodes:
        leaves = list(level)
        for leaf in leaves:
            if  root == 0:
                root = Node(leaf)
            else:
                append_Node(leaf, root)
    
    search_Preorder(root)
    print(preorder+'\n')
    preorder = ''

def append_Node(value, root):
    if root is None:
        return Node(value)
    if value > root.value:
        root.right = append_Node(value, root.right)
    else:
        root.left = append_Node(value, root.left)
       
    return root

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def search_Preorder(node):
    global preorder
    if node is None:
        return
    preorder += node.value
    search_Preorder(node.left)
    search_Preorder(node.right)


read_data('leave.in')