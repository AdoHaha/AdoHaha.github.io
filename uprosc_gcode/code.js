function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}


function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}


 function focus_gcode(event)
		    {

		    event.target.select();




		    }


function simplify_gcode(gcode_str) // this replaces all .number with truncated version of this number
	{
	var re1 = new RegExp("([.])([0-9]+)","g");

	function replacer(match,p1,p2,offset,string)
		{
			//console.log(match);
			//return "zenon"
			var arrayLength = match.length;
			var uproszczony="";
			for(var i=0;i<arrayLength && i<=4;i++)
			{
			uproszczony=uproszczony+match[i];
			}
			return uproszczony;
		}
	//gcode_str=gcode_str.replace(re1,replacer);
	return gcode_str.replace(re1,replacer);
	





	}
  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    var reader = new FileReader();
    





    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');

	reader.onload = (function(theFile) {
		return function(evt){
	      
		
			
		    generateResultView(evt.target.result,theFile.name,theFile.type);
		    
			
		


	
		};
	})(f);


      reader.readAsText(f);
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }
  function generateResultView(gtext,filename,filetype) //function will generate resulting html
  {
  
  ////
  var simplified=simplify_gcode(gtext);
  document.getElementById('file_text').innerHTML='<a id="safe_file" href="#"><h3>Safe truncated gcode file  </h3></a><br><br><textarea class="gcode" id="gcode_text">'+simplified+'</textarea>';
			
		   

			function click_download(event) 
				{
				event.preventDefault();
				download(simplified,"truncated_"+filename,filetype);
				return false;
				}

			document.getElementById("safe_file").addEventListener('click',click_download,false);
			document.getElementById("gcode_text").addEventListener('focus',focus_gcode,false);


  
  ////
  
  }
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

function browserisslow(source){
 console.log(source);
 generateResultView(source.value,"truncated_gproject.nc","application/x-netcdf");
 
}

function handleInputTextarea(evt) {
var source = evt.target || evt.srcElement;

       setTimeout(browserisslow, 200,source); //the text appears only after the paste event

    
    
		    
} 

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  var gcodeModify= document.getElementById('gcode_to_modify');
  gcodeModify.addEventListener('paste',handleInputTextarea,false);
  gcodeModify.addEventListener('focus',focus_gcode,false);

