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
