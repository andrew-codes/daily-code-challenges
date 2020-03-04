export const nodes = {
    'Node:1': {
        isRoot: true,
        children: ['Node:2'],
        name: 'node 1',
    },
    'Node:2': {
        children: ['Node:3'],
        parent: 'Node:1',
        name: 'node 2',
    },
    'Node:3': {
        children: ['Node:4'],
        parent: 'Node:2',
        name: 'node 3',
    },
    'Node:4': {
        children: [],
        parent: 'Node:3',
        name: 'node 4',
    },
    'Node:5': {
        isRoot: true,
        children: ['Node:6', 'Node:7'],
        name: 'node 5',
    },
    'Node:6': {
        children: ['Node:8'],
        parent: 'Node:5',
        name: 'node 6',
    },
    'Node:7': {
        children: [],
        parent: 'Node:5',
        name: 'node 7',
    },
    'Node:8': {
        children: [],
        parent: 'Node:6',
        name: 'node 8',
    },
}
