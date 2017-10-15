<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output encoding="UTF-8" indent="yes" method="html"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" type="text/css" href="bootstrap-css/css/bootstrap.css" />
                <title>Arquivo Sonoro</title>
                <body>
                    <div class="container-fluid">
                        <h1 align="center">Arquivo Sonoro</h1>
                        <hr/>
                        <table>
                            <tr>
                                <td width="30%" valign="top">
                                    <h3><a name="indice"/>Indíce</h3>
                                    <ol>   
                                        <xsl:apply-templates select="arq/doc[not(preceding::prov/normalize-space(.)=normalize-space(./prov))]" mode="indice">
                                            <xsl:sort select="normalize-space(prov)"/>
                                        </xsl:apply-templates>
                                    </ol>
                                </td>
                                <td width="70%">
                                    <xsl:apply-templates mode="conteudo"/>
                                </td>
                            </tr>
                        </table>
                    </div>
                </body>    
            </head>
        </html>
    </xsl:template>
    
    <!-- templates para gerar o indice -->
    <xsl:template match="doc" mode="indice">     
        <li>
            <xsl:value-of select="prov"/>
            <xsl:variable name="c" select="normalize-space(prov)"/>
            <ul>
                <xsl:apply-templates select="/arq/doc[normalize-space(prov)=$c and not(preceding::tit/normalize-space(.)=normalize-space(./tit))]" mode="tit">
                    <xsl:sort select="normalize-space(tit)"/>
                </xsl:apply-templates>
            </ul>
        </li>
        
    </xsl:template>
    
    <xsl:template match="doc" mode="tit">
        <li>
            <a href="#{generate-id()}">
                <xsl:value-of select="normalize-space(tit)"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- templates para gerar o conteudo -->
    <xsl:template match="doc" mode="conteudo">
        <h3>
            <a name="{generate-id()}"/>
            <xsl:value-of select="normalize-space(tit)"/>
        </h3>
        <h6>
            [<a href="#indice">Voltar ao indice</a>]
        </h6>
        
        <xsl:if test="prov">
            <p><b>Provincia: </b> <xsl:value-of select="prov"/></p>
        </xsl:if>
        <xsl:if test="local">
            <p><b>Local: </b> <xsl:value-of select="local"/></p>
        </xsl:if>
        <xsl:if test="tit">
            <p><b>Titulo: </b> <xsl:value-of select="tit"/></p>
        </xsl:if>
        <xsl:if test="musico">
            <p><b>Musica: </b> <xsl:value-of select="musico"/></p>
        </xsl:if>
        <xsl:if test="inst">
            <p><b>Instrumento: </b> <xsl:value-of select="inst"/></p>
        </xsl:if>
        <xsl:if test="obs">
            <p><b>Observações: </b> <xsl:value-of select="obs"/></p>
        </xsl:if>
        <xsl:if test="file">
            <p><b>Ficheiro: </b> <xsl:value-of select="file"/></p>
        </xsl:if>
        <xsl:if test="duracao">
            <p><b>Duração: </b> <xsl:value-of select="duracao"/></p>
        </xsl:if>
        <hr/>
    </xsl:template>
    
</xsl:stylesheet>