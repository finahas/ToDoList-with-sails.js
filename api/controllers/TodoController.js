/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function(req,res){
     Todo.find({}).exec(function(err,xtodo){
          if(err){
             res.send(500, {error: 'error'});
            }
            res.view('list',{ytodo:xtodo});
        });
  },
    
  add: function(req,res){
      res.view('add');
  },
  
  create: function(req,res){
      var item = req.body.item;

      Todo.create({item:item}).exec(function(err){
         if(err){
            res.send(500, {error: 'error'});  
         }

         res.redirect('/todo/list');
      });
 },

  delete: function(req, res){
        Todo.destroy({id:req.params.id}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/todo/list');
        });

        return false;
 },   

  edit: function(req,res){
    Todo.findOne({id:req.params.id}).exec(function(err,xtodo){
        if(err){
            res.send(500,{error:'Database Error'});
        }

        res.view('edit',{ytodo:xtodo});
    });
  },    

  update: function(req,res){
    var item = req.body.item;

    Todo.update({id:req.params.id},{item:item}).exec(function(err){
       if(err){
          res.send(500, {error: 'error'});  
       }

       res.redirect('/todo/list');
    });
    return false;
  }   
  

};