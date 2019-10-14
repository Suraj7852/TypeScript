import * as fs from 'fs';
import * as input from 'readline-sync';
class util {
    ReadFile(path)
    {
        var hold = fs.readFileSync(path,'utf8');
        hold = JSON.parse(hold);
        return hold;
    }

    WriteJsonFile(path, obj)
    {
        var json = JSON.stringify(obj);
        fs.writeFileSync(path,json);
    }

    removeInArray(arr,index)
    {
        var arr1 = [];
        var k=0;
        for(let i=0;i<arr.length;i++)
        {
            if(i!=index)
                arr1[k++] = arr[i];
        }
        return arr1;
    }

    intInput()
    {
        return input.questionInt();
    }

    stringInput()
    {
        while(true)
        {
            let inp = /[a-zA-Z_]/;
            let out = input.question();
            if(inp.test(out))
                return out;
            else
                console.log("Input valid string, please.");
        }
        
    }

    Matrix(row, col)
    {
        try {
            if(!isNaN(row)&&!isNaN(col))
            {
                var Arr = new Array(row);
                for(let i=0;i<row;i++)
                {
                    Arr[i] = new Array(col);
                }
                return Arr;
            }
            throw "Enter a valid input";
        } catch (error) {
            return error;
        } 
    }
    
    MatrixPrint(row,col,arr)
    {
        try {
            if(arr!=null)
            {
                for(let i=0;i<row;i++)
                {
                    for(let j=0;j<col;j++)
                    {
                        if(arr[i][j] != undefined)
                            process.stdout.write(arr[i][j]+" ");
                        else
                            process.stdout.write("");
                            
                    }
                    console.log("");
                }
            }
            throw "Array should not be empty:";
        } catch (error) {
            return error;
        }
    }
    
    BubbleSortInt(arr)
    {
        try {
            if(arr!=null)
            {
                var temp=0;
                for(let i=0;i<arr.length;i++)
                {
                    for(let j=i+1;j<arr.length;j++)
                    {
                        if(arr[i]>arr[j])
                        {
                            temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
                return arr;
            }
            throw "array is Empty";
        } catch (error) {
            return error;
        }
        
    }
}
let ut = new util();
export = ut