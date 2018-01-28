/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


grammar jsToOnto;

@header{
        import java.util.*;
        import java.io.*;
        }

@members{
         List<String> ontologia = new ArrayList <>();
         List<String> ind = new ArrayList <>();
         List<String> rel = new ArrayList <>();
         List<String> triples_users = new ArrayList <>();
         List<String> triples_posts = new ArrayList <>();
         List<String> triples_published = new ArrayList <>();
         
         
         Map<String,String> idAuthor = new TreeMap<>();
         Map<String,String> userId = new TreeMap<>();
        
         
         String typePub = "";
         String loginType ="";
         
         int idPerson = 1;
         int idPost = 1;
         int idPerson_trip = 1;
         int idPost_trip = 1;
         //Type: User or Post
         String type = "";
         }



jsFile returns[String _id]
@after{
       ontologia.add("Ontologia iOnto\n"+
                        "\nconceitos {"+
	"\nUser[_id: String, loginType: String, token: String, password: String, name: String, age: String, gender: String, id: String, email: String, address: String, profession: String, type: String, cnumber: String, confirmed: String, aboutme: String],\n"+
	"Post,\n"+
	"AcademicRegistry[duration: String, credits: String,author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"AcademicWork[course: String, professor: String, classication: String, file: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"Appointment[author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"Birth[name: String, gender: String, parents: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"Chronicle[theme: String, text: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"Event[eventType: String, hosts: String, guests: String, text: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"Idea[keywords: String, priority: String, text: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"Photo[file: String, people: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+ 
	"Recipe[ingredients: String, instructions: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"SportsRegistry[sport: String, duration: String, results: String, participants: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"Thought[keywords: String, text: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
	"Wedding[couple: String, guests: String, menu: String, author: String, type: String, ident: String, title: String, location: String, privacy: String, date: String, description: String, pubdate: String,comments: String],\n"+
        "}\n\n\n"
);
                   
        ind.add("\n}\n");
        ontologia.addAll(ind);
        rel.add("\n relacoes{\n"+
                    "\t is-a, iof, published,"+
                        "\n}\n");
        ontologia.addAll(rel);
        ontologia.addAll(triples_users);
        triples_posts.add("\n}.\n");
        ontologia.addAll(triples_posts);
                            
       //Imprimir ontologia para ficheiro
       try{
         FileWriter writer = new FileWriter("C:/Users/"+System.getProperty("user.name")+"/Documents/GitHub/PLC_PRI/Trabalho/GCS/output.txt");
         for(String str: ontologia) {
             writer.write(str);
         }
         writer.flush();
         writer.close();
         System.out.println("Gravei ontologia");
       }catch(Exception e){
         System.out.println("Erro ontologia");
         }
      
     
      } 
    
    : {ind.add("\nindividuos {\n\t");
       triples_users.add("\ntriplos {\n");}

     ('{')? (TXT ':[' ( '{' TXT ':' TXT {$_id=$TXT.text.replace("\"","");
                                          } 
                        ',' (TXT {loginType=$TXT.text;} ':')? {//System.out.println($TXT.text);
                                           if(($TXT.text.replace("\"","").equals("facebook")) || ($TXT.text.replace("\"","").equals("google")) || ($TXT.text.replace("\"","").equals("local"))){
                                                                  type = "User";
                                                                  }
                                         else {type="Post";}
                                         if(type.equals("User")){
                                          String person = "user_" + (idPerson);
                                          idAuthor.put($_id, person);
                                          userId.put(person,$_id);
                                          //System.out.println(idAuthor);
                                          }
                                         //System.out.println(type);
                                         }
                                         
                                         
                                         
                                          fields  ('},'|'}') {
                                                             if(type.equals("User")){
                                                                                    ind.add("user_"+idPerson + ","); idPerson++;}
                                                             else {ind.add("post_"+idPost+ ","); idPost++;}
                                                             } )+ ']' (',')? )+ '}'
       ;


fields returns[String tipo, String atrib] 
@init{
      Map<String,String> mapAtribs = new TreeMap<>();
      }
@after{
       if(type.equals("User")){
       triples_users.add("];\n\n\n");}
       
       else{
       //System.out.println(mapAtribs);
       String tipo = mapAtribs.get("type");
       //System.out.println(tipo);
       
       triples_posts.add("post_" + idPost_trip + "= iof =>" + tipo.replace("\"","") +"["); idPost_trip++;
       
       if(!mapAtribs.isEmpty()){
       for (Map.Entry<String, String> entry : mapAtribs.entrySet()) {
            triples_posts.add(entry.getKey() + "=" + entry.getValue());
            if(!entry.getKey().isEmpty()){triples_posts.add(",");}
            } 
       }
       triples_posts.remove(triples_posts.size() -1);
       triples_posts.add("];\n");
       triples_posts.add(tipo.replace("\"","")+"= is-a => Post;\n\n" );
       }}

    
    : '{'? {
            if(type.equals("User")){
                                 triples_users.add("user_" + idPerson_trip + "= iof => User["); 
                                 String user = "user_" + idPerson_trip;
                                 //System.out.println(user);
                                 //System.out.println(userId.get(user));
                                 idPerson_trip++;
                                 
                                 triples_users.add("_id =\"" +userId.get(user)+ "\",");
                                 triples_users.add("loginType =" +loginType+ ",");
                                 }}
      
                            TXT{$tipo=$TXT.text.replace("\"","");} 
                            ':' TXT{$atrib=$TXT.text;
                                        
                                        if(type.equals("User")){triples_users.add($tipo+ "=" +$atrib);
                                                                
                                                                }
                                        if(type.equals("Post")) { mapAtribs.put($tipo,$atrib);}
                                   }                                        
      
      
      (',' 
        inst[mapAtribs]{$fields.atrib= $inst.atrib;} )+ ('},' v)?
       ;

inst [ Map<String,String> mapAtribs]
    returns[String tipo, String atrib, String id, String Author, String comentarios]

    : TXT{$tipo=$TXT.text.replace("\"","");} ':' 
        TXT{$atrib=$TXT.text;
            if(type.equals("User")){triples_users.add("," +$tipo+ "=" +$atrib);}
            if(type.equals("Post")) { mapAtribs.put($tipo,$atrib);
                                          if($tipo.equals("ident")){

                                            if(idAuthor.containsKey($atrib.replace("\"",""))){ 
                                           
                                            triples_posts.add(idAuthor.get($atrib.replace("\"","")) + "= published =>post_" + idPost+  ";\n");
                                       }}
}}
           
    | TXT {$tipo=$TXT.text.replace("\"","");} 
    ':[' {$comentarios="\"";}(TXT {$comentarios=$comentarios +$TXT.text.replace("\"","");} (',' TXT {$comentarios= $comentarios + " || " + $TXT.text.replace("\"","");})*)? {
                                                                                                        System.out.println($comentarios);
                                                                                                        $comentarios= $comentarios + "\"";
                                                                                                        if($comentarios != null && !$comentarios.isEmpty())
                                                                                                        {mapAtribs.put($tipo,$comentarios);}
                                                                                                        else {mapAtribs.put($tipo,"\"null\"");}}   ']'
    ;

v: TXT ':0'
 ;

PAL: [a-zA-Z] [-a-zA-Z_0-9]*;
TXT: [\'] ~[\']* [\'] 
   | [\"] ~[\"]* [\"]
   ;
Sep:('\r'? '\n' | '\t' | ' ')+ ->skip;
Comment:'%%'~('\n')*'\n' ->skip;
