// converted from some code I wrote previosuly in C#
// dictionary.json downloaded and converted to json from http://www.puzzlers.org - official scrabble players dictionary 

export default class PrefixTree
{
    constructor() 
    {
        this.root = new PrefixTreeNode();
    }

    add = (key) =>
    {
        if (key == null)
        {
            return;
        }

        let current = this.root;
        for (let i = 0; i < key.length; ++i)
        {
            // if doesn't contain key add it
            let index = key[i];
            if (current.next.get(index) === undefined)
            {
                current.next.set(index, new PrefixTreeNode());
            }

            // go to next node
            current = current.next.get(index);
        }

        // mark at end
        //current.isAtEnd = true;
    }
}

class PrefixTreeNode
{    
    constructor() 
    {   
        this.next = new Map();
        this.isAtEnd = false;
    }
}

// set up our prefix tree
/*let dictionary = require("../data/dictionary.json");
let prefixTree = new PrefixTree();

// add dictionary to prefix tree
for (let i = 0; i < dictionary.length; ++i)
{
    prefixTree.add(dictionary[i]);
}*/

