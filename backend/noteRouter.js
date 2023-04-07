// import { Router} from "express";
// import  NoteData  from "./models/schema.js"


// const noteRouter = Router();

// noteRouter.get('/getAllNotes', (req, res)=> {
//     res.status(200).send({
//         data: [],
//         message: 'All notes',
//         success: true
//     })
// })

// noteRouter.post('/addNewNote', (req, res)=> {
    
//     const note = new NoteData({
//         title:req.body.title,
//         text:req.body.text
//     })
   
//      note.save().then((data)=>{
//         console.log(data);
//         res.send(data);
//      })
   
// })

// noteRouter.delete('/delete', (req, res)=> {
//     res.status(200).send({
//         data: [],
//         message: 'Note deleted',
//         success: true
//     })
// })

// noteRouter.put('/update', (req, res)=> {
//     res.status(200).send({
//         data: [],
//         message: 'Note updated',
//         success: true
//     })
// })


// export default noteRouter;
