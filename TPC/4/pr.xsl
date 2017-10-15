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
                <title>Project Record</title>
            </head>
            <body>
                <div class="container">
                    <h1 align="center">Project Record</h1>
                    <xsl:apply-templates/>
                </div>
            </body>
        </html>
    </xsl:template>
    
    <!-- METADATA -->
    <xsl:template match="meta">
        <hr/>
        <h2 align="left">Metadata</h2>
        <table width="100%">
            <tr>
                <td>
                    <b>ID: </b> <xsl:apply-templates select="id"/>
                </td>
                <td>
                    <b>BEGIN DATE: </b> <xsl:apply-templates select="bdate"/>
                </td>
            </tr>
            <tr>
                <td>
                    <b>TITLE: </b> <xsl:apply-templates select="title"/>
                </td>
                <td>
                    <b>END DATE: </b> <xsl:apply-templates select="edate"/>
                </td>
            </tr>
            <tr>
                <td>
                    <b>SUBTITLE: </b> <xsl:apply-templates select="subtitle"/>
                </td>
                <td>
                    <b>SUPERVISOR: </b> <xsl:apply-templates select="supervisor"/>
                </td>
            </tr>
        </table>
    </xsl:template>
    
    <xsl:template match="id|bdate|title|edate|subtitle">
        <xsl:value-of select="."/>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <xsl:if test="@url">
            <a href="{@url}"><xsl:value-of select="."/></a>
        </xsl:if>
        <xsl:if test="not(@url)">
            <xsl:value-of select="."/>
        </xsl:if>
    </xsl:template>
    
    <!-- WORKTEAM -->
    <xsl:template match="team">
        <hr/>
        <h2 align="left">Workteam</h2>
        <ul>
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    
    <xsl:template match="student">
        <ul>
            <li>
                <b>Name: </b> <xsl:value-of select="name"/> <br/>
                <b>Number: </b> <xsl:value-of select="nr"/> <br/>
                <b>Email: </b> <a href="mailto:{email}"><xsl:value-of select="email"/></a> <br/>
            </li>
        </ul>
    </xsl:template>
    
    <!-- ABSTRACT -->
    <xsl:template match="abstract">
        <hr/>
        <h2 align="left">Abstract</h2>
        <ul>
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    
    <xsl:template match="p">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="xref">
        <a href="{@url}"><xsl:apply-templates/></a>
    </xsl:template>
    
    <xsl:template match="iref">
        <a href="#{@url}"><xsl:apply-templates/></a>
    </xsl:template>
    
    <xsl:template match="img">
        <img src="{@src}"/>
    </xsl:template>
    
    <xsl:template match="code">
        <pre>
            <code>
                <xsl:apply-templates/>
            </code>
        </pre>
    </xsl:template>
    
    <!-- DELIVERABLES -->
    <xsl:template match="deliverables">
        <hr/>
        <h2 align="left">Deliverables</h2>
        <ul>
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <ul>
            <li>
                <a href="{@url}"><xsl:value-of select="."/></a>
            </li>
        </ul>
    </xsl:template>
    
</xsl:stylesheet>