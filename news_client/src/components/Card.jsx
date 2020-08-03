import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
function Card(props)
{     
    const savePost=async () =>{
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: props.title,imageUrl:props.imgUrl,full:props.full,objectId:props.objectId })
                    };
                    var url = '/save';
                    
                    fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(data =>{
                        alert(data.status);
                    });

   }
   
   
   const deletePost=async () =>{
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: props.title,imageUrl:props.imgUrl,full:props.full,objectId:props.objectId })
                };
                var url = '/delete';
                
                fetch(url, requestOptions)
                .then(response => response.json())
                .then(data =>{
                    
                    props.fetchSavedItems();
                    alert(data.status);
                });

}



         
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 align-items-center cardOut" style={{width: 15+'rem'}}>
         <div className="shadow p-3 mb-5 bg-white rounded">
        <img className="card-img-top" src={props.imgUrl} alt="" />
         <div className="card-body">
         <h5 className="card-title">{props.title}</h5>
         <a href={props.full} target="_blank" class="btn btn-secondary btn-sm">Full Article</a>
         
         {(props.loginStatus&&props.showSaved==false)?
         (<a className="floatRight " data-toggle="tooltip" data-placement="top" title="Save Article"   
              onClick={savePost}
         >
         <SaveIcon />
         </a>)
         :""
         }
         
         {(props.showSaved)?
         (<a className="floatRight " data-toggle="tooltip" data-placement="top" title="Delete Article"   
              onClick={deletePost}
         >
         <DeleteIcon />
         </a>)
         :""
         }

         </div>
        </div>
       </div>
    )
    
};

export default Card;