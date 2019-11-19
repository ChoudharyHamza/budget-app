
// budget controller module 
/* a module is a varible that uses a IIFE to make varieble and functions private and viecersa and then return the needeed
value in the form of a property or a method to the varieble */

 var BudgetController = (   function ()
 {
     // defining the construtor for creating the objects for income added 
    var Incomes = function(ID, desc, pri)
    {
        this.ID = ID;
        this.desc = desc;
        this.price = pri;
    }   
    // defining the construtor for creating the objects for expenses added
    var Expenses = function(ID, desc, pri)
    {
        this.ID = ID;
        this.desc = desc;
        this.price = pri;
    }
    // defining the data structure that will be used to store the created with constructors and keep record of them objects
    var data = {  
        allItems: {
            inc:[],
            exp:[]    
        },
        totals: {
            inc:0,
            exp:0
        },
        budget : 0,
        per : -1
    }
    // defining the function that will get the values and call the construtors to create the object for incomes and expenses
    return {
        addItem : function (type, desc, pri)
        { 
            var newItem, ID;
            if(data.allItems[type].length > 0)
            {
             ID = data.allItems[type][data.allItems[type].length-1].ID + 1;
            }
            else
            {
                ID = 0;
            }
            if(type == 'inc')
            {
             newItem = new Incomes(ID, desc, pri);  
            }
            else if(type == 'exp')
            {
             newItem = new Expenses(ID, desc, pri);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        // getting the current month
        getMonth : function()
        {
            var date = new Date();
            var mon = date.getMonth() + 1;
            switch(mon)
            {
            case 1:
                mon = 'january'
                break;
            case 2:
                mon = 'february'
                break;
            case 3:
                mon = 'march'
                case 4:
                mon = 'aprail'
                break;
                case 5:
                mon = 'may'
                break;
                case 6:
                mon = 'june'
                break;
                case 7:
                mon = 'july'
                break;
                case 8:
                mon = 'august'
                break;
                case 9:
                mon = 'september'
                break;
                case 10:
                mon = 'octuber'
                break;
                case 11:
                mon = 'november'
                break;
                case 12:
                mon = 'december'
                break;
            }
            return mon;

        },
        deleteItem : function(type, ID)
        {var ids, index ;
        
            ids = data.allItems[type].map(function(item){
                return item.ID;
            });                
            index = ids.indexOf(ID); 
            data.allItems[type].splice(index, 1);
        },

        addToMain : function (type)
        { 
            var sum = 0, per = -1, budget = 0;
            arr = data.allItems[type];
            arr.forEach(function (item){
                sum = sum +item.price;
                
            })

            data.totals[type] = sum;
            budget = data.totals.inc - data.totals.exp;
            data.budget = budget;
            if(data.totals.inc !== 0 && budget > -1)
            {
            per = Math.round((data.totals.exp/data.totals.inc)*100);
            }else
            {per = -1; }
            data.per = per ;
            return {
                inc : data.totals.inc, 
                sum : sum,
                budget : budget,
                per : per
            }
        },
        display : function()
        {
            console.log(data);
        },
        
        calculatePercentage : function(budgetValues)
        
        {   var per, arr, perArr = [], arr1;    
            
            arr = data.allItems.exp;
            
            arr1 = arr.map(function(item) {
                

                return item.price;
                
            });

            arr1.forEach(function(item1){
                per = Math.round((item1/budgetValues)*100);
                perArr.push(per);
            });
            return perArr;
        }   
    
    }

    
    


 })();


 //User interface controller
var UIController = (    function ()
{   
    // an object containing all the string of classes used a to access html elements 
    var DOMClassStrings = {
        itemCon: '.container',
        button: '.add__btn',
        addType : '.add__type',
        addDescription : '.add__description',
        addValue : '.add__value',
        expenseItemsCon : '.expenses__list',
        incomeItemCon : '.income__list',
        mainIncomefie : '.budget__income--value',
        mainExpenseFie : '.budget__expenses--value',
        mainExpenseper : '.budget__expenses--percentage',
        budgetValue : '.budget__value',
        percentageField:'.item__percentage',
        monthEle : '.budget__title--month'
    }
    function textFormat(text)
    {
        var numb = 0;

        //  the numbers should have only 2 decimal parts
        // the numbers should have , after 3 words
        numb = text.toFixed(2);
        numb = numb.split('.');
        integer = numb[0];
        deci = numb[1];
        if(integer.length > 3)
        {
            numb = integer.substr(0 , integer.length-3)+','+integer.substr(integer.length - 3, integer.length);
        }
        numb = numb +'.'+ deci;
        console.log(numb);

        return numb;
    }

    //returning an object  to the  UIcontroller
    return {
        DOMClassStrings,
        //declaring a method to get values that will be part of UI controller

        getValues : function (){ 
            // since need to return multiple values so we can say that  we will return an object 
            return{
                type : document.querySelector(DOMClassStrings.addType).value,
                description : document.querySelector(DOMClassStrings.addDescription).value,
                amount : parseFloat(document.querySelector(DOMClassStrings.addValue).value),
            };
        },
        showMonth : function(mon)
        {
            document.querySelector(DOMClassStrings.monthEle).textContent = mon.toUpperCase();
        },

        //a method to display the values into the UI
        addItemUI : function(obj, value)
        { var html, newHtml, element;

            // adding the HTML code in the  form of string to be used later in addAdjusent statement depending upon it being an income or expense
            if(value === 'inc')
            {   // using element to define wether to diplay the values in the income or expense field 
                element =  DOMClassStrings.incomeItemCon;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(value === 'exp')
            {
                element = DOMClassStrings.expenseItemsCon;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // adding the values to the string 
            newHtml = html.replace('%id%', obj.ID);
            newHtml = newHtml.replace('%description%', obj.desc);
            newHtml = newHtml.replace('%value%', textFormat(obj.price));
            // adding the string to the DOM using add adjusent
            document.querySelector(element).insertAdjacentHTML('afterbegin', newHtml);

        },
        deleteItemUI : function(id)
        {
            var element = document.getElementById(id);
            element.parentNode.removeChild(element);
        },

        // removing the item from UI after whole thing is removed from data structure 
        clearFields : function()
        {
            fields =  document.querySelectorAll(DOMClassStrings.addDescription +', '+ DOMClassStrings.addValue);
            fields = Array.prototype.slice.call(fields);
            
            fields.forEach(function(item, index){
                item.value = '';
            });

        },
        // defining a function that will clear the fields after the values have been added
        updateMainField : function(type, budgetValues)
        {
            if(type == 'inc')
            {
                document.querySelector(DOMClassStrings.mainIncomefie).textContent = '+'+textFormat(budgetValues.sum);
                document.querySelector(DOMClassStrings.mainExpenseper).textContent = budgetValues.per + '%';
            }
            else if(type == 'exp')
            {
                document.querySelector(DOMClassStrings.mainExpenseFie).textContent = '-'+textFormat(budgetValues.sum);
                document.querySelector(DOMClassStrings.mainExpenseper).textContent = budgetValues.per + '%';
            }
            document.querySelector(DOMClassStrings.budgetValue).textContent = textFormat(budgetValues.budget);
        },

        //displaying values on the UI
        showPercentages : function(list)
        {
           var fields = document.querySelectorAll('.item__percentage');
           

           function myForEach(fields)
           {
               for(var i=0; i<list.length; i++)
               {
                callback(fields[i] , list[i]);
               }
           }

           function callback(item, per)
           {
               if(per > 0 && per <100)
               {
                item.textContent = per+"%";
               }
               else {item.textContent = '---'}

            }
           myForEach(fields);
        }


    };

})();
//Global app controller module
var Controller = (  function (budgetCTRL, UICTRL)
{   
    var callEvents = function ()
    {
        // using the object used in the budget controller module here as well
        var DOM = UICTRL.DOMClassStrings;
        // event to get data when we call use button
        document.querySelector(DOM.button).addEventListener('click', ctrlAddItem);
        document.querySelector(DOM.itemCon).addEventListener('click', ctrlDeleteItem);

        //event  when we use enter
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13)
            {
                ctrlAddItem();  
            }
        });    
    }

    function clearpage()
    {
        var  DOM = UICTRL.DOMClassStrings;
        document.querySelector(DOM.mainExpenseFie).textContent = '0';
        document.querySelector(DOM.mainIncomefie).textContent = '0';
        document.querySelector(DOM.budgetValue).textContent = '0';

    }

    function ctrlAddItem() 
    {
        // getting the values from ui
        var input = UICTRL.getValues();

       if(input.amount > 0 && input.description !=="" && !isNaN(input.amount) )
       {
        // adding the items to the data structure
        var newItem = budgetCTRL.addItem(input.type, input.description, input.amount);
       
        // adding the values to the UI
        UICTRL.addItemUI(newItem, input.type);   

        // clearing the fields after adding the value
        UICTRL.clearFields();

        //calculating the main  budget field values
        budgetValues = budgetCTRL.addToMain(input.type);

        //updating the value in the main conosle
        UICTRL.updateMainField(input.type, budgetValues);

        
        // calculating the percentage of the expenses 
        var perc = budgetCTRL.calculatePercentage(budgetValues.inc);
        
        //displaying th percentages on the screen
        UICTRL.showPercentages(perc);
        
       }
    }

    function ctrlDeleteItem(event)
    { var item, ID, type, itemSplit, getValues;
        // 1. get the target element as we are using event delegation
        item = event.target.parentNode.parentNode.parentNode.parentNode.id;
        itemSplit = item.split('-');
        ID = parseInt(itemSplit[1]);
        type = itemSplit[0];
        
        //2. delete the item from the data structure 
        budgetCTRL.deleteItem(type, ID);

        //3.delete the item from the UI
        UICTRL.deleteItemUI(item);

        // recalculating teh budget again
        budgetValues = budgetCTRL.addToMain(type);

        // and displaying the 
        UICTRL.updateMainField(type, budgetValues);

        // calculate the percentage of the each expense item
        var perc = budgetCTRL.calculatePercentage(budgetValues.inc);

        console.log(perc);

        // displaying the percentages on the UI
        UICTRL.showPercentages(perc);


    }


// defining the initializer function  thatv will be used to initialize the events 
    return {
        init : function()
        {
            var mon = budgetCTRL.getMonth();
            UICTRL.showMonth(mon);
            callEvents();
            clearpage();
        }
    }

    
        

})(BudgetController , UIController);

Controller.init();
