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
         
         List<String> dot = new ArrayList <>();
         List<String> owl = new ArrayList <>();
         
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

individuos: 'individuos' '{'(txtpal{if(!ind.contains($txtpal.texto)){
                                                                    ind.add($txtpal.texto);
                                                                    ind_owl.add("<Declaration> \n <NamedIndividual IRI=\"#" + $txtpal.texto+ "\"/>" + "\n</Declaration>");
                                                                    }
                                   else
                                        System.out.println("Foi inserido um individuo previamente adicionado: "+$txtpal.text);
                                   }
            
            ',' )+'}'
          ;

relacoes : 'relacoes' '{' (PAL{if(!rel.contains($PAL.text)){
                                                          rel.add($PAL.text); 
                                                          rel_owl.add("<Declaration> \n <ObjectProperty IRI=\"#" + $PAL.text+ "\"/>" + "\n</Declaration>");
                                                          }
                             else 
                                System.out.println("Foi inserida uma relação previamente adicionada: "+$PAL.text);
                             }
           
           ',' )+'}' 
         ;

triplos : 'triplos' '{' (frase ';')+ '}'
        ;
          
frase :   ligacao (';' ligacao)*
      ;

ligacao 
@after{
        // Erros de definição.
        if(!(rel.contains(rel1) || rel1.equals("is-a") || rel1.equals("iof") || rel1.equals("pof") || rel1.equals("subclasse"))) System.out.println("Relação não definida: "+rel1);
        if(!(con.contains(pal1) || ind.contains(pal1) )) System.out.println("Palavra não definida: "+pal1);
        if(!(con.contains(pal2) || ind.contains(pal2) )) System.out.println("Palavra não definida: "+pal2);
        
        // Erros de estrutura. 
        if (rel1.equals("is-a")){    
            if(con.contains(pal1)){
               if(!con.contains(pal2)){
                  if(ind.contains(pal2)){
                     System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                     "\"is-a\" só suporta relações conceito-conceito: "+pal2+" é um individuo.\n");       
                     }
                  }
               }
            else{
                 if(ind.contains(pal1)){
                     System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                     "\"is-a\" só suporta relações conceito-conceito: "+pal1+" é um individuo.\n");       
                     }
                 if(ind.contains(pal2)){
                     System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                     "\"is-a\" só suporta relações conceito-conceito: "+pal1+" e "+pal2+" são individuos.\n");       
                     }
                 }
            }
        else{
             if(rel1.equals("iof")){
                if(ind.contains(pal1)){
                    if(!con.contains(pal2)){
                        if(ind.contains(pal2)){
                            System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                            "\"iof\" só suporta relações individuo-conceito: "+pal2+" é um individuo.\n");       
                            }
                        }
                    }
                else{
                    if(con.contains(pal1)){
                        if(ind.contains(pal2)){
                            System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                            "\"iof\" só suporta relações individuo-conceito: "+pal1+" é um conceito e "+pal2+" é um individuo.\n");       
                        }
                        else  System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                              "\"iof\" só suporta relações individuo-conceito: "+pal1+" é um conceito.\n");       
                              }
                    }                         
                }
             else{
                  if(rel1.equals("pof")||rel.contains(rel1)){
                     if(con.contains(pal1)){
                        if(!con.contains(pal2)){
                           if(ind.contains(pal2)) 
                              System.out.println( "Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                              rel1 + " só suporta relações entre elementos do mesmo tipo: "+pal2+" é um individuo.\n");
                              }
                        }
                     else{
                         if(ind.contains(pal1)){
                            if(!ind.contains(pal2)){
                                if(con.contains(pal2)) 
                                    System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+
                                    rel1 + " só suporta relações entre elementos do mesmo tipo: "+pal2+" é um conceito.\n");
                                    }                    
                            }
                         }
                     }
                  }
             }
        if(dot.contains("\""+pal1+"\" -> \""+pal2+"\" [ label = \""+ rel1 +"\" ];")){
                                                                                     System.out.println("Erro em: "+pal1+" = "+rel1+" => "+ pal2+"\n"+"Este triplo já foi adicionado.\n");                                                                          
                                                                                     }
        
       dot.add("\""+pal1+"\" -> \""+pal2+"\" [ label = \""+ rel1 +"\" ];");
       
       if(rel1.equals("is-a")){
                               relh_owl.add("<SubClassOf> \n <Class IRI=\"#" + pal1 + "\"/>" + "\n <Class IRI=\"#" + pal2 + "\"/>" + "\n</SubClassOf>");
                               }
       if(rel1.equals("iof")){
          inst_owl.add("<ClassAssertion> \n <Class IRI=\"#" + pal1 + "\"/>" + "\n <NamedIndividual IRI=\"#" + pal2 + "\"/>" + "\n</ClassAssertion>");
          }
       
       if(rel1.equals("owns")| rel1.equals("has") | rel1.equals("pof")){
          instTrip_owl.add("<ObjectPropertyAssertion> \n <ObjectProperty IRI=\"#" + rel1 + "\"/>" + "\n <NamedIndividual IRI=\"#" + pal1 + "\"/>" + "\n <NamedIndividual IRI=\"#" 
          + pal2 + "\"/>"+ "\n</ObjectPropertyAssertion>");
          triplos_owl.add("<ObjectPropertyDomain> \n <ObjectProperty IRI=\"#" + rel1 + "\"/>" + "\n <Class IRI=\"#" + pal1 + "\"/>" + "\n</ObjectPropertyDomain>");
          triplos_owl.add("<ObjectPropertyRange> \n <ObjectProperty IRI=\"#" + rel1 + "\"/>" + "\n <Class IRI=\"#" + pal2 + "\"/>" + "\n</ObjectPropertyRange>");          
          }
       }        
    : txtpal{pal1 = $txtpal.texto;} '=' relacao {rel1 = $relacao.rel;} '=>' txtpal {pal2 = $txtpal.texto;}
        ;

relacao returns [String rel] 
        : PAL{if(!(rel.contains($PAL.text) || !$PAL.equals("is-a") || !$PAL.equals("iof") || !$PAL.equals("pof")))
                  System.out.println("Relação não suportada: "+$PAL.text);
             else $rel = $PAL.text;}
        ;

txtpal returns[String texto, String atrib, String tipo]   
    
    : PAL {$texto = $PAL.text;} ('['+PAL {$atrib=$PAL.text;} '=' TXT{$tipo = $TXT.text;
                                                                     if(!conAtribs.containsKey($texto)){System.out.println($texto+ " nao tem atributos");}
                                                                     else{
                                                                          List<String> str = conAtribs.get($texto);
                                                                          if(!str.contains($atrib)){
                                                                                                    System.out.println("Nome do atributo errado: " +$atrib+ "\tNo indivíduo: " +pal1);
                                                                                                    }
                                                                          }
                                                                         
                                                                         instAtrib_owl.add("<DataPropertyAssertion> \n <DataProperty IRI=\"#" + $atrib + "\"/>" + "\n <NamedIndividual IRI=\"#" + pal1 + 
                                                                         "\"/> \n <Literal datatypeIRI=\"&xsd;" + data.get($atrib) + "\">"+ $tipo.replace("\"","") + "</Literal> \n</DataPropertyAssertion>");
                                                                         
                                                                         atribCon_owl.add("<DataPropertyDomain> \n <DataProperty IRI=\"#" + $atrib + "\"/>" + "\n <Class IRI=\"#" + $texto + 
                                                                         "\"/> \n </DataPropertyDomain> \n <DataPropertyRange> \n <DataProperty IRI=\"#" + $atrib+ "\"/> \n <Datatype abbreviatedIRI=\"xsd:" 
                                                                         +data.get($atrib) +  "\"/> \n</DataPropertyRange>");
                                                                         
                                                                         
                                                                         if($texto.startsWith("Pagela")){                                                                            
                                                                                  if(map.containsKey(pal1)){
                                                                                                            map.get(pal1).add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                            }     
                                                                                  else{
                                                                                       List<String> str = new ArrayList<>();
                                                                                       str.add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                       map.put(pal1,str);
                                                                                       }
                                                                                                         }
                                                                         else if($texto.startsWith("Pessoa")){
                                                                                                               if(map_pes.containsKey(pal1)){
                                                                                                                                             map_pes.get(pal1).add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                                             }
                                                                                                               else{
                                                                                                                    List<String> str = new ArrayList<>();
                                                                                                                    str.add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                    map_pes.put(pal1,str);
                                                                                                                    }
                                                                                                               }
                                                                         else if($texto.startsWith("Evento")){
                                                                                                              if(map_ev.containsKey(pal1)){
                                                                                                                                           map_ev.get(pal1).add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                                           }
                                                                                                              else{
                                                                                                                   List<String> str = new ArrayList<>();
                                                                                                                   str.add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                   map_ev.put(pal1,str);
                                                                                                                   }
                                                                                                              }
                                                                         }
                                                                         
                                    
                                ( ',' +PAL {$atrib=$PAL.text;} '=' TXT{$tipo = $TXT.text;
                                                                       if(!conAtribs.containsKey($texto)){System.out.println($texto+ " nao tem atributos");}
                                                                       else{
                                                                            List<String> str = conAtribs.get($texto);
                                                                            if(!str.contains($atrib)){
                                                                                                      System.out.println("Nome do atributo errado: " +$atrib+ "\tNo indivíduo: " +pal1);
                                                                                                      }
                                                                            }
                                                                           
                                                                           instAtrib_owl.add("<DataPropertyAssertion> \n <DataProperty IRI=\"#" + $atrib + "\"/>" + "\n <NamedIndividual IRI=\"#" + pal1 + 
                                                                           "\"/> \n <Literal datatypeIRI=\"&xsd;" +data.get($atrib) +  "\">"+ $tipo.replace("\"","") + "</Literal> \n</DataPropertyAssertion>");
                                                                          
                                                                           atribCon_owl.add("<DataPropertyDomain> \n <DataProperty IRI=\"#" + $atrib + "\"/>" + "\n <Class IRI=\"#" + $texto + 
                                                                           "\"/> \n </DataPropertyDomain> \n <DataPropertyRange> \n <DataProperty IRI=\"#" + $atrib+ "\"/> \n <Datatype abbreviatedIRI=\"xsd:" 
                                                                           +data.get($atrib) +  "\"/> \n</DataPropertyRange>");
                                                                           
                                                                           if($texto.startsWith("Pagela")){
                                                                                                           if(map.containsKey(pal1)){
                                                                                                                                     map.get(pal1).add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                                     }
                                                                                                           else{
                                                                                                                List<String> str = new ArrayList<>();
                                                                                                                str.add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                map.put(pal1,str);
                                                                                                                }
                                                                                                           }
                                                                           else if($texto.startsWith("Pessoa")){
                                                                                                                if(map_pes.containsKey(pal1)){
                                                                                                                                              map_pes.get(pal1).add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                                              }
                                                                                                                else{
                                                                                                                     List<String> str = new ArrayList<>();
                                                                                                                     str.add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                     map_pes.put(pal1,str);
                                                                                                                     }
                                                                                                                }
                                                                           else if($texto.startsWith("Evento")){
                                                                                                                if(map_ev.containsKey(pal1)){
                                                                                                                                             map_ev.get(pal1).add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                                             }
                                                                                                                else{
                                                                                                                     List<String> str = new ArrayList<>();
                                                                                                                     str.add("<p><b>"+$atrib+":  </b>" + $tipo.replace("\"","")+"\n </p>");
                                                                                                                     map_ev.put(pal1,str);
                                                                                                                     }
                                                                                                                }})* ']')?
       ;

PAL: [a-zA-Z] [-a-zA-Z_0-9]*;
TXT: [\'] ~[\']* [\'] 
   | [\"] ~[\"]* [\"]
   ;
Sep:('\r'? '\n' | '\t' | ' ')+ ->skip;
Comment:'%%'~('\n')*'\n' ->skip;
