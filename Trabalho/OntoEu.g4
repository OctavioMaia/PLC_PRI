/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

grammar OntoEu;


ontologia: 'Diario' '{'eu+'}'
         ;

eu: nome ',' idade ',' genero ',' EMAIL ',' morada ',' profissao ',' numeroTel '{' publicacao* '}'
  ;

publicacao: titulo DATA descricao subtipo ';'
          ;

subtipo: casamento
       | receita
       | nascimento
       | ideia
       | eventoCientifico
       | eventoDesportivo
       ;

casamento: nome
         ;

receita: PAL
       ;

nascimento: nome genero 'pai: 'nome 'mãe: 'nome
          ;

ideia:
     ;

eventoCientifico:
                ;

eventoDesportivo: (nome', ')* nome 'Resultado: ' PAL
                ;


nome: PAL
    ;

idade: NUM
     ;

genero: 'Masculino'
      | 'Feminino'  
      ;


morada: PAL
      ;

profissao: PAL
         ;

numeroTel: NUM
         ;

titulo: PAL
      ;

descricao: PAL
         ;

EMAIL: [a-z] [-a-z_0-9]*[@] [a-z] [-a-z_0-9.@]*;
PAL: [a-zA-Z] [-a-zA-Z_0-9]*;   
NUM: [0-9]+;
/*
* Adicionar 3 da mesma coisa = coisa[3] ????
*/
DATA: [0-3][0-9]'-'[01][0-9]'-'[0|2][0-9][0-9][0-9];

Sep:('\r'? '\n' | '\t' | ' ')+ ->skip;
Comment:'%%'~('\n')*'\n' ->skip;