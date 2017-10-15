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
                                <h3><a name="indice"/>Indíce de Histórias</h3>
                                <xsl:apply-templates mode="indice"/>
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
    
    <!-- templates para o conteudo -->
    
    <xsl:template match="h">
        <h2>
            <a name="{generate-id()}"/>
            <xsl:value-of select="@tit"/>
        </h2>
        <h6>
            [<a href="#indice">Voltar ao indice</a>]
        </h6>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- templates para gerar o indice -->
    
    <xsl:template match="mp" mode="indice">
       <ul>
           <xsl:apply-templates mode="indice"/>
       </ul>
    </xsl:template>
  
    <xsl:template match="h" mode="indice">
        <li>
            <a href="#{generate-id()}">
                <xsl:value-of select="@tit"/>
            </a>
        </li>
    </xsl:template>

    <xsl:template match="text()" priority="-1" mode="indice"/>
    
</xsl:stylesheet>