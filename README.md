**Mini javascript library for validating forms**

**Requirements**

_***JQuery**_ 

**How to use it?**

After including euvalidate.js in your html, 
you need to create an instance of the class euvalidate.

let obj = new **euvalidate()**;

**Adding clases and attributes**

**The controls that you want to validate need to have the class form-control.**

<input class="form-control" required placeholder="name">

Add clases and attributes to the form's controls.

**Attributes:**

*required

*min

*max


**Clases:**

*numeric

*url

*email

**validating SELECT Controls**

for validating select, just put required and value -1 in the selected value.

After adding the clases and attributes needed, you need to pass the object of the form that 
you want to validate, using jquery like so:

let **form**  = $('#form');

After doing so, you can validate the form using an if statement:

if(obj.validateForm(**form**))
{

  //it passes the validation rules
  
}else
{

   // try again

}

**More**

for more details of how to use this mini library, 
open the index.html file.