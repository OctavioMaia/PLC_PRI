<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <!-- Tudo o que gerar será colocado no ficheiro index.html-->
        <xsl:result-document href="website/index.html">
            <h1>Arquivo Sonoro de Ernesto Veiga de Oliveira</h1>
            <h3>Índice de Temas</h3>
            <ol>
                <xsl:apply-templates select="//prov[not(preceding::prov=.)]">  <!-- Tira os repetidos -->
                    <xsl:sort select="."/>  <!-- Ordenado alfabeticamente -->
                </xsl:apply-templates>               
            </ol>
        </xsl:result-document>    
        <xsl:apply-templates mode="conteudo"/>
    </xsl:template>
    
    
    <!-- Templates para a página principal -->
    <xsl:template match="doc" mode="conteudo">
        <!-- Cria os .html de acordo com o id -->
        <xsl:result-document href="website/{generate-id()}.html">
            <table border="1">
                <tr>
                    <td>
                        <xsl:if test="preceding-sibling::doc">
                            <a href="{generate-id(preceding-sibling::doc[last()])}.html">Anterior</a>
                        </xsl:if>
                    </td>
                    <td><a href="index.html">Índice</a></td>
                    <td> 
                        <xsl:if test="following-sibling::doc">
                            <a href="{generate-id(following-sibling::doc[1])}.html">Seguinte</a>
                        </xsl:if>
                    </td>
                </tr>
            </table>
            
            <h1><xsl:value-of select="tit"/></h1>
            <b>Provincia: </b><xsl:value-of select="prov"/><br/>
            <b>Local: </b><xsl:value-of select="local"/><br/>
            <b>Musico: </b><xsl:value-of select="musico"/><br/>
            
        </xsl:result-document>
    </xsl:template>
    
    <!-- Templates para a página principal-->
    <xsl:template match="prov">
        <xsl:variable name="p" select="."/>
        <li>
            <xsl:value-of select="."/>
            <ol>
                <xsl:apply-templates select="//tit[$p=../prov]">  <!-- ".." para voltar para tras -->
                    <xsl:sort select="."/>
                </xsl:apply-templates>
            </ol>
        </li>
    </xsl:template>
    
    <xsl:template match="tit">
        <li>
            <a href="{generate-id(..)}.html">
                <xsl:value-of select="."/>
            </a>
        </li>
    </xsl:template>
    
    
</xsl:stylesheet>