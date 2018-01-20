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
         List<String> triples = new ArrayList <>();
         
         int idPerson = 1;
         }

jsFile 
@after{
       ontologia.add("Ontologia IAm\n"+
                        "\nconceitos {\n"+
                            "\n\tPerson[name: String, age: String, gender: String, email: String, address: String, profession: String, phoneNumber: String],"+
                            "\n\tPublication[title: String, location: String, privacy: String, date: String, description: String],"+
                            "\n\tPhotoAlbum[albumTitle:String], Photo[path: String, location: String], AcademicRegistry[duration: String, credits: String],"+
                            "\n\tEvent[eventType: String, hosts: String, guests: String], Wedding[couple: String, guests: String, menu: String],"+
                            "\n\tBirth[childName: String, childGender: String, parents: String], Thought[keywords: String],"+
                            "\n\tIdea[keywords: String, priority: String], Recipe[ingredients: String, instructions: String],"+
                            "\n\tAcademicWork[course: String, professor: String, classication: String],"+
                            "\n\tSportsRegistry[sport: String, duration: String, results: String],"+
                            "\n\tChronicle[theme: String, text: String],"+
                            "\n}\n");
                   
        ind.add("\n}\n");
        ontologia.addAll(ind);
        rel.add("\n relacoes{\n"+
                    "\t is-a, has, owns, iof, pof, published,"+
                        "\n}\n");
        ontologia.addAll(rel);
        triples.add("\n}.\n");
        ontologia.addAll(triples);
                            
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
      
      System.out.println(ontologia);
      } 
    
    : {ind.add("\nindividuos {\n\t");
       triples.add("\ntriplos {\n");}
       
     '[' ( '{' TXT ':' TXT ',' TXT ':' fields ('},'|'}') {ind.add("person_"+idPerson + ","); idPerson++;} )+ ']'
       ;


fields returns[String tipo, String atrib] 
@after{
       triples.add("];\n\n\n");
       } 

    
    : '{' {triples.add("person_" + idPerson + "= iof => Person[");}
                            TXT{$tipo=$TXT.text.replace("\"","");} 
                            ':' TXT{$atrib=$TXT.text;
                                   triples.add($tipo+ "=" +$atrib);
                                   }                                        
      
      
      (',' TXT{$tipo=$TXT.text.replace("\"","");} 
       ':' TXT{$atrib=$TXT.text;
               System.out.println($tipo);
     if(!$tipo.equals("token")){
             triples.add("," +$tipo+ "=" +$atrib);
                      }
            })+ '},' v
       ;


v: TXT ':0'
 ;

PAL: [a-zA-Z] [-a-zA-Z_0-9]*;
TXT: [\'] ~[\']* [\'] 
   | [\"] ~[\"]* [\"]
   ;
Sep:('\r'? '\n' | '\t' | ' ')+ ->skip;
Comment:'%%'~('\n')*'\n' ->skip;
