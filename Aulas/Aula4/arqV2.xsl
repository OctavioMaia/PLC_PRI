<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output encoding="UTF-8" indent="yes" method="html"/>
    
    <xsl:template match="/">
        <ol>
            <xsl:apply-templates select="ARQSITS/ARQELEM[not(preceding::CONCEL/normalize-space(.)=normalize-space(./CONCEL))]">
                <xsl:sort select="normalize-space(CONCEL)"/>
            </xsl:apply-templates>
        </ol>        
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <li>
            <xsl:value-of select="CONCEL"/>
            <xsl:variable name="c" select="normalize-space(CONCEL)"/>
            <ul>
                <xsl:apply-templates select="/ARQSITS/ARQELEM[normalize-space(CONCEL)=$c]" mode="arqsits">
                    <xsl:sort select="IDENTI"/>
                </xsl:apply-templates>
            </ul>
        </li>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="arqsits">
        <li>
            <xsl:value-of select="IDENTI"/>
        </li>
    </xsl:template>
    
</xsl:stylesheet>