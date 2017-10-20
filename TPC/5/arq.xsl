<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    
    <!-- Templates para a página principal -->
    <xsl:template match="ARQELEM">
        <!-- Cria os .html de acordo com o id -->
        <xsl:result-document href="website/{count(preceding-sibling::ARQELEM)+1}.html">
            <table width="100%">
                <tr>
                    <td width="33%" align="middle">
                        <xsl:if test="preceding-sibling::ARQELEM">
                            <a href="{count(preceding-sibling::ARQELEM)}">Anterior</a>
                        </xsl:if>
                    </td>
                    <td width="33%" align="middle">
                        <a href="1">Inicio</a>
                    </td>
                    <td width="33%" align="middle"> 
                        <xsl:if test="following-sibling::ARQELEM">
                            <a href="{count(preceding-sibling::ARQELEM)+2}">Seguinte</a>
                        </xsl:if>
                    </td>
                </tr>
            </table>
            
            <h1 align="middle"> <xsl:value-of select="IDENTI"/></h1>
            <hr/>
            <h3><b>Informação: </b></h3>
            <b>Autor: </b><xsl:value-of select="AUTOR"/><br/>
            <b>Data: </b><xsl:value-of select="DATA"/><br/>
            <b>Lugar: </b><xsl:value-of select="LUGAR"/><br/>
            <b>Freguesia: </b><xsl:value-of select="FREGUE"/><br/>
            <b>Concelho: </b><xsl:value-of select="CONCEL"/><br/>
            <b>Latitude: </b><xsl:value-of select="LATITU"/><b> Longitude: </b><xsl:value-of select="LONGIT"/><br/>
            <b>Altitude: </b><xsl:value-of select="ALTITU"/><br/>
            <b>Acesso: </b><xsl:value-of select="ACESSO"/><br/>
            <b>Crono: </b><xsl:value-of select="CRONO"/><br/>
            <b>Descrição :</b><xsl:value-of select="DESCRI"/><br/>
            <hr/>
            <h3><b>Resumo: </b></h3>   <xsl:value-of select="QUADRO|DESARQ|INTERE|INTERP|TRAARQ"/><br/>
            <hr/>
            <h3><b>Bibliografia: </b></h3> <xsl:value-of select="BIBLIO"/><br/>
         </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>