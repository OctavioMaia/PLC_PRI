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
                <h1>Avaliação de PRI2017</h1>
                <table border="1">
                    <tr>
                        <th>Aluno</th><th>TPC</th><th>Projeto</th><th>Teste</th>
                    </tr>
                    <xsl:apply-templates/>   
                </table>  
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="aval">
        <tr>
            <xsl:apply-templates/>
        </tr>    
    </xsl:template>

    <xsl:template match="aluno">
        <td>
            <ul>
                <xsl:apply-templates/>
            </ul>
        </td>
    </xsl:template>
    
    <xsl:template match="nome|numero">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>

    <xsl:template match="email">
        <li>
            <a href="mailto:{.}">
                <xsl:value-of select="."/>
            </a>
        </li>
    </xsl:template>

    <xsl:template match="tpcs">
        <td>
            <table>
                <xsl:apply-templates/>
            </table>
        </td>
    </xsl:template>

    <xsl:template match="tpc">
        <tr>
            <td>
                <xsl:value-of select="titulo"/>
            </td>
            <td>
                <xsl:value-of select="data"/>
            </td>
            <td>
                <xsl:value-of select="nota"/>
            </td>
        </tr>
    </xsl:template>

</xsl:stylesheet>