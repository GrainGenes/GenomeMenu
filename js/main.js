define([
        'dojo/_base/declare',
//        'dojo/_base/lang',
//        'dojo/Deferred',
//        'dojo/dom-construct',
//        'dojo/query',
		'dojo/store/Memory',
		'dijit/form/ComboBox',
		'dijit/MenuItem',
		'dijit/MenuSeparator',
        'JBrowse/Plugin'
    ],
       function(
        declare,
//        lang,
//        Deferred,
//        domConstruct,
//        query,
		dojoMemoryStore,
		dijitComboBox,
		dijitMenuItem,
		dijitMenuSeparator,
        JBrowsePlugin
       ) {
return declare( JBrowsePlugin,
{
    constructor: function( args ) {
        let thisB = this;
        let browser = this.browser;

		console.log("plugin: GenomeMenu");
		console.log("url path",window.location.pathname);

		let overrideGenomeMenu = args.overrideGenomeMenu || false;
		let shareHide = args.shareHide || true;

		let datasets = this.browser.config.datasets;

		// create subgroup list
		let subgroups = {};
		for( let i in datasets) {
			if (i.startsWith("subgroup-")) {
				let subs = i.replace("subgroup-","");
				subgroups[subs] = datasets[i].subgroup;
			}
		}

		// add popmenu CDN plugin https://www.jqueryscript.net/menu/dynamic-popup-menu.html
		//$('body').prepend('<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/tianlunvip/popmenu/popmenu.css">');
		$('body').prepend('<link rel="stylesheet" href="plugins/GenomeMenu/js/dynamic-popup-menu/popmenu.css">');
		//$('body').prepend('<script src="//cdn.jsdelivr.net/gh/tianlunvip/popmenu/popmenu.min.js"></script>');
		$('body').prepend('<script src="plugins/GenomeMenu/js/dynamic-popup-menu/popmenu.js"></script>');

		// handle hiding share button
		if (shareHide) {
			browser.afterMilestone( 'initView', function() {
				console.log("hiding share");
				$('span[widgetid*="dijit_form_Button_0"]').css("visibility","hidden");
			});
		}
		browser.afterMilestone( 'initView', function() {

			setTimeout(function() {
				$("[widgetid*='dropdownbutton_dataset']").before('<span class="genomemenu2 dijit dijitReset dijitInline menu dijitDropDownButton" widgetid="dropdownbutton_genomemenu"> Genome</span>');
				$("[widgetid*='dropdownbutton_dataset']").hide();
	
				let gm = $("[widgetid*='dropdownbutton_genomemenu']");
				
				gm.click(function() {
					//alert("genome menu");
					$('<div/>').dialog({
						modal: true,
						title: 'Genome Menu',
						open: function() {
							let thisb = this;
							$.get("/ggds/genome-menu.php", function(data) {
								var result = data.substring(data.indexOf('<div '));		
								console.log(result);
								let str = `<style>
								.ggbrowse-header {
									width: 100%;
									color: white;
									font-weight: bold;
									font-size: 120%;
									margin-top: 25px;
									margin-bottom: 5px;
									background-image: url(/jb/img/subtitle.png?1);
									padding: 5px;
									background-repeat: no-repeat;
									background-size: contain;
								
									-webkit-border-top-left-radius: 5px;
									-moz-border-radius-topleft: 5px;
									border-top-left-radius: 5px;
								}
								.ggbrowse-item {
									position:relative;
									overflow:hidden;
									border: 3px solid #335671;
									width: 263px;
									display: inline-block;
									background-size:400px;
									height:70px;
									vertical-align:top;
									margin-right: 8px;
									margin-bottom: 8px;
								
									-webkit-border-bottom-right-radius: 10px;
									-webkit-border-bottom-left-radius: 10px;
									-moz-border-radius-bottomright: 10px;
									-moz-border-radius-bottomleft: 10px;
									border-bottom-right-radius: 10px;
									border-bottom-left-radius: 10px;
									box-shadow: 5px 5px 7px grey;
								}
								.ggbrowse-subgroup-btn {
									cursor: pointer;
								}
								.ggbrowse-subgroup {
									padding: 10px;
								}
								.ggbrowse-subgroup > .ggbrowse-item {
									width: 250px;
								}
								.ggbrowse-item > div {
									position: absolute;
									top: 10px;
									left: 10px;
									width: 250px;
								}
								.ggbrowse-bkg {
									position: absolute;
									top:0px;
									left:0px;
									opacity: .4;
								}
								.ggbrowse-bkg1 {
									position: absolute;
									top:0px;
									left:0px;
									opacity: .6;
								}
								.ggbrowse-bkg2 {
									position: absolute;
									bottom:0px;
									left:0px;
									width:50%;
									opacity: 100;
								}
								.ggbrowse-a:link,.ggbrowse-a:active,.ggbrowse-a:visited,.ggbrowse-a:hover {
									color: black;
									font-weight: bold;
									text-shadow: 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white;
								}
								.ggbrowse-a:hover {
									color: grey;
								}
								
								.whe-iwgsc2018 {
									background-image: url(/ggds/whe-iwgsc2018/banner.jpg);
								}
								.whe-svevo2018 {
									background-image: url(/ggds/whe-svevo2018/banner.jpg);
								}
								.whe-tauschii2017 {
									background-image: url(/ggds/whe-tauschii2017/banner.jpg);
								}
								.whe-zavitan2019 {
									background-image: url(/ggds/whe-zavitan2019/banner.jpg);
								}
								.whe-zavitan2017 {
									background-image: url(/ggds/whe-zavitan2017/banner.jpg);
								}
								.whe-pan2017 {
									background-image: url(/ggds/whe-pan2017/banner.jpg);
								}
								.whe-estmaps {
									background-image: url(/ggds/whe-iwgsc2018/banner.jpg);
								}
								.whe-physicalmaps {
									background-image: url(/ggds/whe-iwgsc2018/banner.jpg);
								}
								.whe-grainmaps {
									background-image: url(/ggds/whe-iwgsc2018/banner.jpg);
								}
								.bar-morex2018 {
									background-image: url(/ggds/bar-morex2018/banner.jpg);
								}
								.bar-ensembl2016 {
									background-image: url(/ggds/bar-ensembl2016/banner.jpg);
								}
								.bar-barbinmaps {
									background-image: url(/ggds/bar-morex2018/banner.jpg);
								}
								.rye-secale2017 {
									background-image: url(/ggds/rye-secale2017/banner.jpg);
								}
								.rye-1rsmap {
									background-image: url(/ggds/rye-secale2017/banner.jpg);
								}
								.oat-avena2013 {
									background-image: url(/ggds/oat-avena2013/banner.jpg);
								}
								.other-brach {
									background-image: url(/ggds/whe-iwgsc2018/banner.jpg);
								}
								.other-ricecereal {
									background-image: url(/ggds/whe-iwgsc2018/banner.jpg);
								}
								
								</style>`;
								str += `
								<div class="ggbrowse-item"><img class="ggbrowse-bkg" src="/ggds/whe-iwgsc2/banner.jpg"><div><a class="ggbrowse-a" href="/jb?data=/ggds/whe-iwgsc2">Wheat Chinese Spring IWGSC RefSeq v2.1 genome assembly (2021)</a></div></div>
								<div class="ggbrowse-item"><img class="ggbrowse-bkg" src="/ggds/whe-iwgsc2018/banner.jpg"><div><a class="ggbrowse-a" href="/jb?data=/ggds/whe-iwgsc2018">Wheat Chinese Spring IWGSC RefSeq v1.0 genome assembly (2018)</a></div></div>
								<div class="ggbrowse-item"><img class="ggbrowse-bkg" src="/ggds/bar-morex3/banner.jpg"><div><a class="ggbrowse-a" href="/jb?data=/ggds/bar-morex3">Barley Morex V3 (2021)</a></div></div>
								<div class="ggbrowse-item"><img class="ggbrowse-bkg" src="/ggds/oat-sang/banner.jpg"><div><a class="ggbrowse-a" href="/jb?data=/ggds/oat-sang">Avena sativa, Oat Sang v1 Genome, Kamal et al. (2022)</a></div></div>
								<div class="ggbrowse-item"><img class="ggbrowse-bkg" src="/ggds/oat-ot3098v2-pepsico/banner.jpg"><div><a class="ggbrowse-a" href="/jb?data=/ggds/oat-ot3098v2-pepsico">PepsiCo OT3098 v2 Hexaploid Oat (2021)</a></div></div>
								<div class="ggbrowse-item"><img class="ggbrowse-bkg" src="/ggds/rye-Lo7-2021/banner.jpg"><div><a class="ggbrowse-a" href="/jb?data=/ggds/rye-Lo7-2021">Rye Lo7 pseudomolecules (2021)</a></div></div>
								`;
								$(thisb).html(str);
							});
						},
						buttons: {
						   Ok: function() {
							  $(this).dialog("close");
						   }
						}
					 });
				});
	
			},100);

			$("body").on('click','span[widgetid="dropdownbutton_dataset"]',function() {
				//console.log("Genome Menu Click");

				//var iframe = $("jb_iframe").contents();
				setTimeout(function(){
					//var thing = $('tr[id*="menubar_dataset_bookmark_subgroup"] > td.dijitMenuItemLabel');
					let thing = $('tr[id*="menubar_dataset_bookmark_subgroup"]');
					if (thing.length) {
						for (let i=0;i<thing.length;i++) {
							$("#"+thing[i].id+" > td.dijitMenuItemLabel").append("<span> &gt;</span>");
							let offset = $("#"+thing[i].id).offset();
							let subname = thing[i].id.replace('menubar_dataset_bookmark_subgroup-','');
							$("#"+thing[i].id+" > td").click(function(e) {
								let w = $('div[aria-label="dropdownmenu_dataset"]').width();
								console.log(w,$('div[aria-label="dropdownmenu_dataset"] dijitMenuItem').width());
								popmenu({
									items : subgroups[subname],
									callback: function(item){
										console.log("item",item,subgroups);
										let id = $(item).attr('id');
										let found = false;
										for(var i in subgroups) {
											if (subgroups[i][id]) {
												window.parent.location = subgroups[i][id].url;
												found = true;
											}
										}
										if (!found)
											alert (id+" not found");
									},
									
									x: offset.left + 300,
									y: offset.top + 26
									
								});

								$("[role='popmenu-layer']").mouseleave(function() {
									$("[role='popmenu-layer']").remove();
								});
								$('tr[id*="menubar_dataset_bookmark"]').mouseenter(function() {
									$("[role='popmenu-layer']").remove();
								});
		
								return false;
							});
						}
					}
				},200);
	
	
			});
		});
		/*
         * class override function intercepts
         */
		
		if (overrideGenomeMenu) {
			browser.afterMilestone( 'loadConfig', function() {
				console.log("override menu");
				


				// override Browser
				require(["dojo/_base/lang", "JBrowse/Browser"], function(lang, Browser){
					lang.extend(Browser, {
						renderDatasetSelect: function( parent ) {

							var thisB=this;

							if(this.config.classicMenu) {
								var dsconfig = this.config.datasets || {};
								var datasetChoices = [];
								for( var id in dsconfig ) {
									if( ! /^_/.test(id) )
										datasetChoices.push( Object.assign({ id: id }, dsconfig[id] ) );
								}

								const combobox = new dijitComboBox(
									{
										name: 'dataset',
										className: 'dataset_select',
										value: this.config.datasets[this.config.dataset_id].name,
										store: new dojoMemoryStore({
											data: datasetChoices,
										}),
										onChange: dsName => {
											if (!dsName) return false
											const dsID = datasetChoices.find(d => d.name === dsName).id
											const ds = (this.config.datasets||{})[dsID]
											if (ds) window.parent.location = ds.url
											return false
										},
									})
								combobox.placeAt( parent )
								combobox.focusNode.onclick = function() { this.select() }
								if (this.config.datasetSelectorWidth) {
									combobox.domNode.style.width = this.config.datasetSelectorWidth
									combobox.focusNode.style.width = this.config.datasetSelectorWidth
								}
							}
							else {
								if( this.config.datasets && this.config.dataset_id ) {
									this.addGlobalMenuItem( 'dataset',
											new dijitMenuSeparator() );

								for( var id in this.config.datasets ) {
									if( ! /^_/.test(id) ) {
										var dataset = this.config.datasets[id]

										this.addGlobalMenuItem( 'dataset',
											new dijitMenuItem(
											{
												id: 'menubar_dataset_bookmark_' + id,
												label: id == this.config.dataset_id ? ('<b>' + dataset.name + '</b>') : dataset.name,
												iconClass: 'dijitIconBookmark',
												onClick: dojo.hitch( dataset, function() { window.parent.location = this.url } )
											})
										  );
										}
									}
								}
								this.renderGlobalMenu( 'dataset', {text: 'Genome'}, parent );
							}
						}
					});
				});
			});
		}
    }
});	
});
