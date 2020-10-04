# GenomeMenu

JBrowse Plugin for grouped datasets.

![alt text](https://raw.githubusercontent.com/GrainGenes/GenomeMenu/master/img/GenomeMenu.png "Example")

In JBrowse config file:
```
{
  "datasets": {
		"group-wheat": { "name": "Wheat" },
		"whe-iwgsc2018": {
			"name": "Wheat Chinese Spring IWGSC RefSeq v1.0 genome assembly (2018)",
			"url":"<<domain>>/jb?data=/ggds/whe-iwgsc2018",
		},
		"whe-svevo2018": {
			"name": "Triticum turgidum Durum Wheat Svevo (RefSeq Rel. 1.0) (2019)",
			"url":"<<domain>>/jb?data=/ggds/whe-svevo2018"
		},
		"whe-tauschii2017": {
			"name": "Aegilops tauschii Aet v4.0 genome assembly (2017)",
			"url":"<<domain>>/jb?data=/ggds/whe-tauschii2017"
		},
		"whe-zavitan2019": {
			"name": "Wild Emmer Wheat Zavitan WEWSeq v2.0 genome assembly (2019)",
			"url":"<<domain>>/jb?data=/ggds/whe-zavitan2019"
                },
		"whe-zavitan2017": {
			"name": "Wild Emmer Wheat Zavitan WEWSeq v1.0 genome assembly (2017)",
			"url":"<<domain>>/jb?data=/ggds/whe-zavitan2017"
		},
		"whe-pan2017": {
			"name": "Wheat PanGenome (2017)",
			"url":"<<domain>>/jb?data=/ggds/whe-pan2017"
		},

		"group-barley": { "name": "Barley" },
		"bar-morex2018": {
			"name": "Barley Morex IBSC genome assembly (2017)",
			"url":"<<domain>>/jb?data=/ggds/bar-morex2018"
         	},
		"bar-ensembl2016": {
			"name": "Barley (2016) (Ensembl Release 31)",
			"url":"<<domain>>/jb?data=/ggds/bar-ensembl2016"
		},

		"group-rye": { "name": "Rye" },
		"rye-secale2017": {
			"name": "Rye select Lo7 (2017)",
			"url":"<<domain>>/jb?data=/ggds/rye-secale2017"
         	},

		"group-oat": { "name": "Oat" },
		"oat-avena2013": {
			"name": "Hexaploid Oat (2013)",
			"url":"<<domain>>/jb?data=/ggds/oat-avena2013"
         	}
  }
}  
```

Plugin option overrideGenomeMenu to bypass genome menu link out to parent.  (default false)
This is for versions of jbrowse that do not support the "datasetLinkToParentIframe":true option.

Value is defined in the plugin config of jbrowse config:
```
"plugins": [
    {
        "name":"GenomeMenu",
        "overrideGenomeMenu": true
    }
]
```

## dependencies
https://www.jqueryscript.net/menu/dynamic-popup-menu.html