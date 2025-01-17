/*
 * Ontologia I am...
 */

grammar iOnto;

@header{
        import java.util.*;
        import java.io.*;
        }

@members{
         List<String> con = new ArrayList <>();
         List<String> ind = new ArrayList <>();
         List<String> rel = new ArrayList <>();
         List<String> atribs = new ArrayList <>();
         Map<String,List<String>> conAtribs = new TreeMap<>();
         
         List<String> con_owl = new ArrayList <>();
         List<String> ind_owl = new ArrayList <>();
         List<String> rel_owl = new ArrayList <>();
         List<String> mat_owl = new ArrayList <>();
         List<String> relh_owl = new ArrayList <>();
         List<String> inst_owl = new ArrayList <>();
         List<String> instTrip_owl = new ArrayList <>();
         List<String> instAtrib_owl = new ArrayList <>();
         List<String> triplos_owl = new ArrayList <>();
         List<String> atribCon_owl = new ArrayList <>();
         
         int usertype = -1;
         int auxind;
         List<String> info = new ArrayList <>();
         List<String> userinfo = new ArrayList <>();
         List<String> users = new ArrayList <>();
         List<String> posts = new ArrayList <>();
         
         List<String> dot = new ArrayList <>();
         List<String> owl = new ArrayList <>();
         List<String> json = new ArrayList <>();
         
         
         Map<String,List<String>> map = new TreeMap<>();
         Map<String,List<String>> map_pes = new TreeMap<>();
         Map<String,List<String>> map_ev = new TreeMap<>();
         Map<String,List<String>> map_iof = new TreeMap<>();
         
         List<String> conteudo = new ArrayList<>();
         
         String pal1, pal2, rel1;
         Map<String, String> data = new HashMap<>();
         }

ontologia
@after{   
       //OWL
       owl.add("<?xml version=\"1.0\"?>\n" +
               "<!DOCTYPE Ontology[\n" +
               "\t<!ENTITY xsd \"http://www.w3.org/2001/XMLSchema#\">\n" +
               "\t<!ENTITY xml \"http://www.w3.org/XML/1998/namespace\">\n" +
               "\t<!ENTITY rdfs \"http://www.w3.org/2000/01/rdf?schema#\">\n" +
               "\t<!ENTITY rdf \"http://www.w3.org/1999/02/22?rdf?syntax?ns#\">\n" +
               "]>\n");
       owl.add("<Ontology>");
       owl.addAll(con_owl);
       owl.addAll(mat_owl);
       owl.addAll(rel_owl);
       owl.addAll(ind_owl);
       owl.addAll(relh_owl);
       owl.addAll(inst_owl);
       owl.addAll(instTrip_owl);
       owl.addAll(instAtrib_owl);
       owl.addAll(triplos_owl);
       owl.addAll(atribCon_owl);
       owl.add("</Ontology>");
      
       try{
         FileWriter writer = new FileWriter("C:/Users/"+System.getProperty("user.name")+"/Documents/GitHub/PLC_PRI/Trabalho/GCS/output_OWL.owl");
         for(String str: owl) {
             writer.write(str);
         }
         writer.flush();
         writer.close();
         System.out.println("Gravei OWL");
       }catch(Exception e){
         System.out.println("Erro OWL");
       }
       
       //DOT
       try{
         FileWriter writer = new FileWriter("C:/Users/"+System.getProperty("user.name")+"/Documents/GitHub/PLC_PRI/Trabalho/GCS/output_DOT.dot");
         //FileWriter writer = new FileWriter("D:/Documentos/GitHub/PLC_GCS/TP1-Santinhos/output_DOT.dot");
         for(String str: dot) {
             writer.write(str);
         }
         writer.flush();
         writer.close();
         System.out.println("Gravei DOT");
       }catch(Exception e){
         System.out.println("Erro DOT");
       }
      
      json.add("{ \"Users\":");
      json.addAll(users);
      json.add(", \"Post\":");
      json.addAll(posts);
      json.add("}");
       //JSON
       try{
         FileWriter writer = new FileWriter("C:/Users/"+System.getProperty("user.name")+"/Documents/GitHub/PLC_PRI/Trabalho/GCS/db.json");
         for(String str: json) {
             writer.write(str);
         }
         writer.flush();
         writer.close();
         System.out.println("Gravei JSON");
       }catch(Exception e){
         System.out.println("Erro JSON");
       }
       try{
         FileWriter writer = new FileWriter("C:/Users/"+System.getProperty("user.name")+"/Documents/GitHub/PLC_PRI/Trabalho/GCS/users.json");
         for(String str: users) {
             writer.write(str);
         }
         writer.flush();
         writer.close();
         System.out.println("Gravei Users");
       }catch(Exception e){
         System.out.println("Erro Users");
       }
       try{
         FileWriter writer = new FileWriter("C:/Users/"+System.getProperty("user.name")+"/Documents/GitHub/PLC_PRI/Trabalho/GCS/posts.json");
         for(String str: posts) {
             writer.write(str);
         }
         writer.flush();
         writer.close();
         System.out.println("Gravei Posts");
       }catch(Exception e){
         System.out.println("Erro Posts");
       }
       }
          : 'Ontologia ' PAL {dot.add("digraph "+$PAL.text+ " {");} conceitos individuos? relacoes triplos '.'{dot.add("}"); }
          ;

conceitos returns [String atrib, String conceito] 
          : 'conceitos' '{'(PAL{if(!con.contains($PAL.text)){
                                        con.add($PAL.text);
                                        con_owl.add("<Declaration> \n <Class IRI=\"#" + $PAL.text+ "\"/>" + "\n</Declaration>");
                                 }else System.out.println("Foi inserido um conceito previamente adicionado: "+$PAL.text);
                              }
          
            ('[' atribs[$PAL.text] ']')?
            ',')+'}'
          ;


atribs [String conceito] returns [String atrib, String tipo]
     : 
            PAL {$atrib=$PAL.text;
                 if(!atribs.contains($PAL.text)){
                         atribs.add($PAL.text);}
                 List<String> str = new ArrayList<>();
                  str.add($PAL.text);
                  } 
            ':' PAL {$tipo=$PAL.text; data.put($atrib, $tipo); mat_owl.add("<Declaration> \n <DataProperty IRI=\"#"+$atrib+"\"/>" + "\n</Declaration>");} 
            ((',')PAL {$atrib=$PAL.text;
                       if(!atribs.contains($PAL.text)){
                         atribs.add($PAL.text);}
                       str.add($PAL.text);
                      }
             ':' PAL {$tipo=$PAL.text ; data.put($atrib, $tipo); mat_owl.add("<Declaration> \n <DataProperty IRI=\"#"+$atrib+"\"/>" + "\n</Declaration>");})*
            {conAtribs.put(conceito,str);}
            
         ;

individuos: 'individuos' '{'(PAL{if(!ind.contains($PAL.text)){
                                                                    ind.add($PAL.text);
                                                                    ind_owl.add("<Declaration> \n <NamedIndividual IRI=\"#" + $PAL.text+ "\"/>" + "\n</Declaration>");
                                                                    }
                                   else
                                        System.out.println("Foi inserido um individuo previamente adicionado: "+$PAL.text);
                                   }
            
            ',' )+'}'
          ;

relacoes : 'relacoes' '{' (PAL{if(!rel.contains($PAL.text)){
                                                          rel.add($PAL.text); 
                                                          rel_owl.add("<Declaration> \n <ObjectProperty IRI=\"#" + $PAL.text+ "\"/>" + "\n</Declaration>");
                                                          }
                             else 
                                System.out.println("Foi inserida uma rela��o previamente adicionada: "+$PAL.text);
                             }
           
           ',' )+'}' 
         ;

triplos 
@after{
        users.add("]");
        posts.add("]");
        }
    : 'triplos'{users.add("[");posts.add("[");} '{' (frase ';')+ '}'
        ;
          
frase :   ligacao (';' ligacao )*
      ;

ligacao 
@after{
        // Erros de defini��o.
        if(!(rel.contains(rel1) || rel1.equals("is-a") || rel1.equals("iof") || rel1.equals("pof") || rel1.equals("subclasse"))) System.out.println("Rela��o n�o definida: "+rel1);
        if(!(con.contains(pal1) || ind.contains(pal1) )) System.out.println("Palavra n�o definida: "+pal1);
        if(!(con.contains(pal2) || ind.contains(pal2) )) System.out.println("Palavra n�o definida: "+pal2);
        
        // Erros de estrutura. 
        if (rel1.equals("is-a")){
            if(con.contains(pal1)){
               if(!con.contains(pal2)){
                  if(ind.contains(pal2)){
                     System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                     "\"is-a\" s� suporta rela��es conceito-conceito: "+pal2+" � um individuo.\n");       
                     }
                  }
               }
            else{
                 if(ind.contains(pal1)){
                     System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                     "\"is-a\" s� suporta rela��es conceito-conceito: "+pal1+" � um individuo.\n");       
                     }
                 if(ind.contains(pal2)){
                     System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                     "\"is-a\" s� suporta rela��es conceito-conceito: "+pal1+" e "+pal2+" s�o individuos.\n");       
                     }
                 }
            }
        else{
             if(rel1.equals("iof")){
                if(ind.contains(pal1)){
                    if(!con.contains(pal2)){
                        if(ind.contains(pal2)){
                            System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                            "\"iof\" s� suporta rela��es individuo-conceito: "+pal2+" � um individuo.\n");       
                            }
                        }
                    }
                else{
                    if(con.contains(pal1)){
                        if(ind.contains(pal2)){
                            System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                            "\"iof\" s� suporta rela��es individuo-conceito: "+pal1+" � um conceito e "+pal2+" � um individuo.\n");       
                        }
                        else  System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                              "\"iof\" s� suporta rela��es individuo-conceito: "+pal1+" � um conceito.\n");       
                              }
                    }                         
                }
             else{
                  if(rel1.equals("pof")||rel.contains(rel1)){
                     if(con.contains(pal1)){
                        if(!con.contains(pal2)){
                           if(ind.contains(pal2)) 
                              System.out.println( "Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                              rel1 + " s� suporta rela��es entre elementos do mesmo tipo: "+pal2+" � um individuo.\n");
                              }
                        }
                     else{
                         if(ind.contains(pal1)){
                            if(!ind.contains(pal2)){
                                if(con.contains(pal2)) 
                                    System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                                    rel1 + " s� suporta rela��es entre elementos do mesmo tipo: "+pal2+" � um conceito.\n");
                                    }                    
                            }
                         }
                     }
                  }
             }
        if(dot.contains("\""+pal1+"\" -> \""+pal2+"\" [ label = \""+ rel1 +"\" ];")){
                                                                                     System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+"Este triplo j� foi adicionado.\n");                                                                          
                                                                                     }
        
       dot.add("\""+pal1+"\" -> \""+pal2+"\" [ label = \""+ rel1 +"\" ];");
       
       if(rel1.equals("is-a")){
                               relh_owl.add("<SubClassOf> \n <Class IRI=\"#" + pal1 + "\"/>" + "\n <Class IRI=\"#" + pal2 + "\"/>" + "\n</SubClassOf>");
                               }
       if(rel1.equals("iof")){
          inst_owl.add("<ClassAssertion> \n <Class IRI=\"#" + pal1 + "\"/>" + "\n <NamedIndividual IRI=\"#" + pal2 + "\"/>" + "\n</ClassAssertion>");
          }
       
       if(rel1.equals("owns")| rel1.equals("has") | rel1.equals("pof") | rel1.equals("published")){
          instTrip_owl.add("<ObjectPropertyAssertion> \n <ObjectProperty IRI=\"#" + rel1 + "\"/>" + "\n <NamedIndividual IRI=\"#" + pal1 + "\"/>" + "\n <NamedIndividual IRI=\"#" 
          + pal2 + "\"/>"+ "\n</ObjectPropertyAssertion>");
          triplos_owl.add("<ObjectPropertyDomain> \n <ObjectProperty IRI=\"#" + rel1 + "\"/>" + "\n <Class IRI=\"#" + pal1 + "\"/>" + "\n</ObjectPropertyDomain>");
          triplos_owl.add("<ObjectPropertyRange> \n <ObjectProperty IRI=\"#" + rel1 + "\"/>" + "\n <Class IRI=\"#" + pal2 + "\"/>" + "\n</ObjectPropertyRange>");          
          }
       
       if(rel1.equals("iof") && pal2.equals("User")){
            
            }
       }        
    : txtpal{pal1 = $txtpal.texto;info.add("{");} '=' relacao {rel1 = $relacao.rel;} '=>' txtpal {pal2 = $txtpal.texto;info.add("{");}
        ;

relacao returns [String rel] 
        : PAL{if(!(rel.contains($PAL.text) || !$PAL.equals("is-a") || !$PAL.equals("iof") || !$PAL.equals("pof")))
                  System.out.println("Rela��o n�o suportada: "+$PAL.text);
             else $rel = $PAL.text;}
        ;

txtpal returns[String texto, String atrib, String tipo]
@after{
       
       if($texto.equals("User")){
            if(usertype == 0) info.add(",\"Local\":{");
            if(usertype == 1) info.add(",\"Facebook\":{");
            if(usertype == 2) info.add(",\"Google\":{");

            //System.out.println(usertype);
            info.addAll(userinfo);
            info.add("}");
            info.add(",\"__v\":0}");
            if(users.size()>1)
                users.add(",");
            users.addAll(info);
            
       }
       else{
            info.add("}");
            if(($atrib != null && !$atrib.isEmpty()) &&($texto.equals("Recipe")||$texto.equals("Thought")||$texto.equals("Idea")||$texto.equals("Wedding")||
                $texto.equals("Birth")||$texto.equals("SportsRegistry")||$texto.equals("AcademicWork")||$texto.equals("AcademicRegistry")||$texto.equals("Appointment")||
                $texto.equals("Event")||$texto.equals("Chronicle")||$texto.equals("Photo"))){
                if(posts.size()>1)
                    posts.add(",");
                posts.addAll(info);
                
            }
         }
       info.removeAll(info);
       userinfo.removeAll(userinfo);
       
       }
    : PAL {$texto = $PAL.text;} ('['+PAL {$atrib=$PAL.text;} '=' TXT{$tipo = $TXT.text;
                                    if(!conAtribs.containsKey($texto)){System.out.println($texto+ " nao tem atributos");}
                                    else{
                                         List<String> str = conAtribs.get($texto);
                                         if(!str.contains($atrib)){
                                                                   System.out.println("Nome do atributo errado: " +$atrib+ "\tNo indiv�duo: " +pal1);
                                                                   }
                                         }
                                         
                                        instAtrib_owl.add("<DataPropertyAssertion> \n <DataProperty IRI=\"#" + $atrib + "\"/>" + "\n <NamedIndividual IRI=\"#" + pal1 + 
                                        "\"/> \n <Literal datatypeIRI=\"&xsd;" + data.get($atrib) + "\">"+ $tipo.replace("\"","") + "</Literal> \n</DataPropertyAssertion>");

                                        atribCon_owl.add("<DataPropertyDomain> \n <DataProperty IRI=\"#" + $atrib + "\"/>" + "\n <Class IRI=\"#" + $texto + 
                                        "\"/> \n </DataPropertyDomain> \n <DataPropertyRange> \n <DataProperty IRI=\"#" + $atrib+ "\"/> \n <Datatype abbreviatedIRI=\"xsd:" 
                                        +data.get($atrib) +  "\"/> \n</DataPropertyRange>");
                                       
                                       
                                       
                                            if($texto.equals("User")){
                                                        if($atrib.equals("loginType")){

                                                            if($TXT.text.equals("\"local\"")){ usertype=0;}
                                                            if($TXT.text.equals("\"facebook\"")){ usertype=1;}
                                                            if($TXT.text.equals("\"google\"")){ usertype=2;}

                                                                                       }
                                                        else{
                                                        if($atrib.equals("_id")){
                                                            
                                                            if(info.size()>1) info.add(",");
                                                            info.add("\"_id\":");
                                                            info.add($TXT.text); 
                                                        }
                                                        else{
                                                            if(userinfo.size()>1) userinfo.add(",");
                                                            userinfo.add("\""+$atrib+"\":");
                                                            userinfo.add($TXT.text);
                                                             }
                                                          }
                                                        }
                                            else{
                                                        if(info.size()>1) info.add(",");
                                                        info.add("\""+$atrib+"\":");
                                                        info.add($TXT.text);
                                                    }
                                        }
                                        


                                ( ',' +PAL {$atrib=$PAL.text;} '=' TXT{$tipo = $TXT.text;
                            if(!conAtribs.containsKey($texto)){System.out.println($texto+ " nao tem atributos");}
                            else{
                                 List<String> str = conAtribs.get($texto);
                                 if(!str.contains($atrib)){
                                                           System.out.println("Nome do atributo errado: " +$atrib+ "\tNo indiv�duo: " +pal1);
                                                           }
                                 }

                                instAtrib_owl.add("<DataPropertyAssertion> \n <DataProperty IRI=\"#" + $atrib + "\"/>" + "\n <NamedIndividual IRI=\"#" + pal1 + 
                                "\"/> \n <Literal datatypeIRI=\"&xsd;" +data.get($atrib) +  "\">"+ $tipo.replace("\"","") + "</Literal> \n</DataPropertyAssertion>");

                                atribCon_owl.add("<DataPropertyDomain> \n <DataProperty IRI=\"#" + $atrib + "\"/>" + "\n <Class IRI=\"#" + $texto + 
                                "\"/> \n </DataPropertyDomain> \n <DataPropertyRange> \n <DataProperty IRI=\"#" + $atrib+ "\"/> \n <Datatype abbreviatedIRI=\"xsd:" 
                                +data.get($atrib) +  "\"/> \n</DataPropertyRange>");
                                
                                
                                
                                if($atrib.equals("comments")){
                                                              
                                    String com = $TXT.text;
                                    
                                    String[] coms = com.split(";");
                                    info.add("\""+$atrib+"\":[");
                                    
                                    int size = coms.length;
                                   
                                    if(coms[0].length()>2){
                                    
                                    for( String comment : coms){                                        
                                        info.add(comment);
                                        if(size>1)info.add("\",\"");
                                        size--;
                                        }
                                    }
                                    //info.remove(info.size() - 1);
                                    
                                    info.add("]");
                                                               }
                                else{
                                    if($texto.equals("User")){
                                            if($atrib.equals("loginType")){

                                                            if($TXT.text.equals("\"local\"")){ usertype=0;}
                                                            if($TXT.text.equals("\"facebook\"")){ usertype=1;}
                                                            if($TXT.text.equals("\"google\"")){ usertype=2;}

                                                                                       }                  
                                            else{           
                                            if($atrib.equals("_id")){
                                                                if(info.size()>1) info.add(",");
                                                                info.add("\"_id\":");
                                                                info.add($TXT.text);                
                                                                                }
                                                    else{
                                                                if(userinfo.size()>1) userinfo.add(",");
                                                                userinfo.add("\""+$atrib+"\":");
                                                                userinfo.add($TXT.text);
                                                            }
                                                    }
                                            }
                                             else{
                                                  if(info.size()>1) info.add(",");
                                                  info.add("\""+$atrib+"\":");
                                                  info.add($TXT.text); 
                                                  }
                                             
                                }
                                    })* ']')?
       ;

PAL: [_]?[a-zA-Z] [-a-zA-Z_0-9]*;
TXT: [\'] ~[\']* [\'] 
   | [\"] ~[\"]* [\"]
   ;
Sep:('\r'? '\n' | '\t' | ' ')+ ->skip;
Comment:'%%'~('\n')*'\n' ->skip;
