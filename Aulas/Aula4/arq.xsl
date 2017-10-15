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
                <body>
                    <table>
                        <tr>
                            <td width="30%" valign="top">
                                <h3><a name="indice"/>Indíce</h3>
                                <ol>
                                    <xsl:apply-templates mode="indice"/>
                                </ol>
                            </td>
                            <td width="70%">
                                <xsl:apply-templates/>
                            </td>
                        </tr>
                    </table>
                </body>    
            </head>
        </html>
    </xsl:template>
    
    <!-- templates para gerar o indice -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a href="#{generate-id()}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="text()" priority="-1" mode="indice"/>
    
    <!-- templates para gerar o conteudo -->
    
    <xsl:template match="ARQELEM">
        <hr/>
        <h3>
            <a name="{generate-id()}"/>
            <xsl:value-of select="IDENTI"/>
        </h3>
        <h6>
            [<a href="#indice">Voltar ao indice</a>]
        </h6>
        <p><b>Concelho: </b> <xsl:value-of select="CONCEL"/></p>
        <p><b>Freguesia: </b> <xsl:value-of select="FREGUE"/></p>
        <p><b>Lugar </b> <xsl:value-of select="LUGAR"/></p>
        <p><b>Acesso: </b> <xsl:value-of select="ACESSO"/></p>
        <p><b>Descrição: </b> <xsl:value-of select="DESARQ"/></p>
    </xsl:template>
    
</xsl:stylesheet>