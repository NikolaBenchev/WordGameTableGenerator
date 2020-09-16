let div = document.getElementById("tableDiv"),
input = document.getElementById("input"),
checkbox = document.getElementById("duples"),
tds = document.getElementsByTagName("td"),
table = document.getElementById("table"),
duplicates = false,
sizeTr,
sizeTd,
letters = "абвгдежзийклмнопрстуфхцчшщъьюя",
wordArray = [],
isFree = [];


input.value = "";

window.addEventListener("mousedown", function()
{
    for(let i = 0; i < tds.length; i++)
    {
        tds[i].style.backgroundColor= "white";
    }
})

const removeDuplicates = function(input)
{
    let index = 0;

    wordArray = wordArray.filter(function(item)
    {
        index++;
        return(item != input && item != item[index + 1] ? true : false)
    });
}

const addWord = function(word)
{
    let array = word.split('');
    if(array[0] == " ") array.splice(0, 1);
    array.filter(function(item)
    {
        return (item == ' ' ? false : true)
    });
    word = array.join('');
    wordArray.push(word);
    wordArray.sort();
}

const submit = function()
{
    if(input.value == '') return ;

    if(input.value.includes(','))
    {
        let words = input.value.split(',');
        alert();
        for(let i = 0; i < words.length; i++)
        {
            removeDuplicates(words[i]);
            addWord(words[i]);
        }
        console.log(wordArray);
        return ;
    }

    duplicates = checkbox.checked;

    if(!duplicates)
    {
        removeDuplicates(input.value);
    }

    addWord(input.value);
    console.log(wordArray);
}

const generateTable = function(a)
{
    sizeTr = div.getElementsByTagName("tr").length,
    sizeTd = div.getElementsByTagName("td").length / sizeTr;
    if(a == 'row')
    {
        div = div.getElementsByTagName("tr");
        for(let i = 0; i < div.length; i++)
        {
            div[i].innerHTML += "<td></td>";
        }
        div = document.getElementById("tableDiv");
    }else
    {
        div = div.getElementsByTagName("table")[0];
        let size = div.getElementsByTagName("td").length / div.getElementsByTagName("tr").length;
        div.innerHTML += "<tr></tr>";
        div = div.getElementsByTagName("tr");
        for(let j = 0 ; j < size; j++)
        {
            div[div.length - 1].innerHTML +=  "<td></td>";
        }
        div = document.getElementById("tableDiv");
    }
    div = document.getElementById("tableDiv");
    isFree = [];
    for(let i = 0; i < sizeTr; i++)
    {
        isFree.push(new Array(sizeTd));
        for(let j = 0; j < sizeTd; j++)
        {
            isFree[i][j] = true;
        }
    }

    addDrag();
}

const remove = function(a)
{
    sizeTr = div.getElementsByTagName("tr").length,
    sizeTd = div.getElementsByTagName("td").length / sizeTr;
    if(a == 'row')
    {
        console.log(sizeTr);
        for(let i = 0; i < sizeTr; i++)
        {
            div = div.getElementsByTagName("tr")[i];
            let lastTd = div.getElementsByTagName("td")[sizeTd - 1];
            div.removeChild(lastTd);
            div = document.getElementById("tableDiv");
        }
        div = document.getElementById("tableDiv");
    }else
    {
        div = div.getElementsByTagName("table")[0];
        let lastTbody = div.getElementsByTagName("tbody")[sizeTr - 1];
        div.removeChild(lastTbody);
    }
    div = document.getElementById("tableDiv");

    addDrag();
}

const fill = function()
{
    for(let i = 0; i < tds.length; i++)
    {
        let randomLetter = letters[Math.floor(Math.random() * 30)];
        tds[i].innerText = randomLetter;
    }
}

const includeWords = function()
{
    if(wordArray.length === 0)
    {
        alert("Submit a word first");
        return ;
    }
    for(let i = 0; i < wordArray.length; i++)
    {
        let currentWord = wordArray[i],
        direction = Math.floor(Math.random() * 8);
        /*Left Right Up Down 
        Left-Diagonal-Down Left-Diagonal-Up Right-Diagonal-Down Right-Diagonal-Up*/
        switch(direction)
        {
            case 0:
                Horizontal(1);
                break;
            case 1:
                Horizontal(-1);
                break;
            case 2:
                Vertical(1);
                break;
            case 3:
                Vertical(-1);
                break;
            case 4:
                DiagonalLeft(1);
                break;
            case 5:
                DiagonalLeft(-1);
                break;
            case 6:
                DiagonalRight(1);
                break;
            case 7:
                DiagonalRight(-1);
                break;
            default: 
                break;
        }
    }
}   

const Horizontal = function(direction, index, wordLength, x, y)
{
    //Left
    let options = 0,
    numberOf = wordLength - sizeTd;
    if(index >= wordLength) return ;

    

    Horizontal(direction, index + 1 * direction, wordLength, x + 1 * direction);
}

const Vertical = function(direction)
{
    
}

const DiagonalLeft = function(direction)
{
    
}

const DiagonalRight = function(direction)
{
    
}

const Clear = function()
{
    wordArray = [];
    console.log(wordArray);
}

const addDrag = function()
{
    for(let i = 0; i < tds.length; i++)
    {
        tds[i].draggable = true;

        tds[i].addEventListener("drag", function()
        {
            tds[i].style.backgroundColor = "red";
        });

        tds[i].addEventListener("dragover", function()
        {
            tds[i].style.backgroundColor = "red";
        });
    }
}

const createPDF = function()
{
    // print(table.innerHTML);
    // let doc = new jsPDF('l', 'in', 'a4'),
    // table = document.getElementById("table");
    // doc.addHTML(table, function()
    // {
    //     doc.save('Test.pdf');
    // });
    function generatePDF() {
        // Choose the element that our invoice is rendered in.
        const element = document.getElementById("table");
        // Choose the element and save the PDF for our user.
        html2pdf()
          .from(element)
          .save(element);
      }
}

let lastInput = [];