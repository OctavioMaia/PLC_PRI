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
            </head>
            <body>
                <h1>Arquivo sonoro</h1>
                <table border="1">
                    <tr>
                        <th>Provincia</th><th>Local</th><th>Titulo</th><th>MP3</th>
                    </tr>
                    <xsl:apply-templates/>
                </table>  
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="doc[file/@t='MP3']">
        <tr>
            <xsl:apply-templates/>
        </tr>    
    </xsl:template>
    
    <xsl:template match="prov|local|tit">
        <td>
            <ul>
                <xsl:value-of select="."/>
            </ul>
        </td>
    </xsl:template>
    
    <xsl:template match="file[@t='MP3']">
        <td>
            <ul>
                <a href="{.}">
                    <xsl:value-of select="."/>
                </a>
            </ul>
        </td>
    </xsl:template>
    
    <xsl:template match="text()" priority="-1"/>
    
</xsl:stylesheet>