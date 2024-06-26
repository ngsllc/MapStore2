/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import expect from 'expect';

import { getActionsFromStepEpic, switchTutorialEpic, switchGeostoryTutorialEpic, openDetailsPanelEpic } from '../tutorial';
import { SETUP_TUTORIAL, updateTutorial, initTutorial, closeTutorial } from '../../actions/tutorial';
import { geostoryLoaded, setEditing } from '../../actions/geostory';
import { testEpic, addTimeoutEpic, TEST_TIMEOUT } from './epicTestUtils';
import { onLocationChanged } from 'connected-react-router';
import { setApi, getApi } from '../../api/userPersistedStorage';
import { OPEN_DETAILS_PANEL } from './../../actions/details';

describe('tutorial Epics', () => {
    const GEOSTORY_EDIT_STEPS = [{
        translationHTML: "geostoryIntroEdit",
        selector: "#intro-tutorial"
    }];

    const GEOSTORY_VIEW_STEPS = [{
        translationHTML: "geostoryIntroView",
        selector: "#intro-tutorial"
    }];
    it('getActionsFromStepEpic with object action', (done) => {

        const step = {
            action: {
                next: {
                    type: 'TUTORIAL_ACTION',
                    value: 'value'
                }
            }
        };

        testEpic(getActionsFromStepEpic, 1, updateTutorial({action: 'next', step}), (actions) => {
            expect(actions.length).toBe(1);
            actions.map((action) => {
                switch (action.type) {
                case 'TUTORIAL_ACTION':
                    expect(action.value).toBe('value');
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
            }
        });

    });

    it('getActionsFromStepEpic with array of actions', (done) => {

        const step = {
            action: {
                next: [{
                    type: 'TUTORIAL_ACTION',
                    value: 'value'
                }, {
                    type: 'TUTORIAL_ACTION_2',
                    value: 'value_2'
                }]
            }
        };

        testEpic(getActionsFromStepEpic, 2, updateTutorial({action: 'next', step}), (actions) => {
            expect(actions.length).toBe(2);
            actions.map((action) => {
                switch (action.type) {
                case 'TUTORIAL_ACTION':
                    expect(action.value).toBe('value');
                    break;
                case 'TUTORIAL_ACTION_2':
                    expect(action.value).toBe('value_2');
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
            }
        });

    });

    it('switchTutorialEpic with path', (done) => {
        const pathname = '/dashboard';
        testEpic(switchTutorialEpic, 1, [
            onLocationChanged({
                pathname
            }),
            initTutorial('id', [], {}, null, {}, {})
        ], (actions) => {
            expect(actions.length).toBe(1);
            actions.map((action) => {
                switch (action.type) {
                case SETUP_TUTORIAL:
                    expect(action.id).toBe('/dashboard');
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
                presetList: {
                    'dashboard_mobile_tutorial': [],
                    'dashboard_tutorial': [],
                    'default_tutorial': [],
                    'default_mobile_tutorial': []
                }
            },
            router: {
                location: {
                    pathname
                }
            }
        });

    });

    it('switchTutorialEpic with viewer path', (done) => {
        const pathname = '/viewer/cesium/001';
        testEpic(switchTutorialEpic, 1, [
            onLocationChanged({
                pathname
            }),
            initTutorial('id', [], {}, null, {}, {})
        ], (actions) => {
            expect(actions.length).toBe(1);
            actions.map((action) => {
                switch (action.type) {
                case SETUP_TUTORIAL:
                    expect(action.id).toBe('cesium');
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
                presetList: {
                    'cesium_mobile_tutorial': [],
                    'cesium_tutorial': [],
                    'default_tutorial': [],
                    'default_mobile_tutorial': []
                }
            },
            router: {
                location: {
                    pathname
                }
            }
        });

    });

    it('switchTutorialEpic with path and id', (done) => {
        const pathname = '/dashboard/001';
        testEpic(switchTutorialEpic, 1, [
            onLocationChanged({
                pathname
            }),
            initTutorial('id', [], {}, null, {}, {})
        ], (actions) => {
            expect(actions.length).toBe(1);
            actions.map((action) => {
                switch (action.type) {
                case SETUP_TUTORIAL:
                    expect(action.id).toBe('dashboard');
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
                presetList: {
                    'dashboard_mobile_tutorial': [],
                    'dashboard_tutorial': [],
                    'default_tutorial': [],
                    'default_mobile_tutorial': []
                }
            },
            router: {
                location: {
                    pathname
                }
            }
        });

    });

    it('switchTutorialEpic mobile', (done) => {
        const pathname = '/dashboard/001';
        testEpic(switchTutorialEpic, 1, [
            onLocationChanged({
                pathname
            }),
            initTutorial('id', [], {}, null, {}, {})
        ], (actions) => {
            expect(actions.length).toBe(1);
            actions.map((action) => {
                switch (action.type) {
                case SETUP_TUTORIAL:
                    expect(action.id).toBe('dashboard_mobile');
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
                presetList: {
                    'dashboard_mobile_tutorial': [],
                    'dashboard_tutorial': [],
                    'default_tutorial': [],
                    'default_mobile_tutorial': []
                }
            },
            browser: {
                mobile: true
            },
            router: {
                location: {
                    pathname
                }
            }
        });

    });

    it('switchTutorialEpic missing preset steps', (done) => {
        const pathname = '/dashboard/001';
        testEpic(switchTutorialEpic, 1, [
            onLocationChanged({
                pathname
            }),
            initTutorial('id', [], {}, null, {}, {})
        ], (actions) => {
            expect(actions.length).toBe(1);
            actions.map((action) => {
                switch (action.type) {
                case SETUP_TUTORIAL:
                    expect(action.id).toBe('default');
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
                presetList: {
                    'default_tutorial': [],
                    'default_mobile_tutorial': []
                }
            },
            router: {
                location: {
                    pathname
                }
            }
        });
    });
    it('switchTutorialEpic selecting geostory_edit_tutorial preset for newgeostory page', (done) => {
        const NUM_ACTIONS = 1;
        const pathname = '/geostory/newgeostory';
        testEpic(switchTutorialEpic, NUM_ACTIONS, [
            onLocationChanged({
                pathname
            }),
            initTutorial("", [], {}, null, {}, {})
        ], (actions) => {
            expect(actions.length).toBe(NUM_ACTIONS);
            actions.map((action) => {
                switch (action.type) {
                case SETUP_TUTORIAL:
                    expect(action.id).toBe('geostory');
                    expect(action.steps).toBe(GEOSTORY_EDIT_STEPS);
                    expect(action.stop).toBe(false);
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
                presetList: {
                    'dashboard_mobile_tutorial': [],
                    'dashboard_tutorial': [],
                    'default_tutorial': [],
                    'default_mobile_tutorial': [],
                    'geostory_edit_tutorial': GEOSTORY_EDIT_STEPS,
                    'geostory_view_tutorial': GEOSTORY_VIEW_STEPS
                }
            },
            geostory: {mode: "edit"},
            router: {
                location: {
                    pathname
                }
            }
        });

    });
    it('switchTutorialEpic selecting geostory_view_tutorial preset for story viewer page', (done) => {
        const NUM_ACTIONS = 1;
        const pathname = '/geostory/123';
        testEpic(switchTutorialEpic, NUM_ACTIONS, [
            onLocationChanged({
                pathname
            }),
            initTutorial("", [], {}, null, {}, {})
        ], (actions) => {
            expect(actions.length).toBe(NUM_ACTIONS);
            actions.map((action) => {
                switch (action.type) {
                case SETUP_TUTORIAL:
                    expect(action.id).toBe('geostory');
                    expect(action.steps).toBe(GEOSTORY_VIEW_STEPS);
                    expect(action.stop).toBe(true);
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
                presetList: {
                    'dashboard_mobile_tutorial': [],
                    'dashboard_tutorial': [],
                    'default_tutorial': [],
                    'default_mobile_tutorial': [],
                    'geostory_edit_tutorial': GEOSTORY_EDIT_STEPS,
                    'geostory_view_tutorial': GEOSTORY_VIEW_STEPS
                }
            },
            geostory: {mode: "view"},
            router: {
                location: {
                    pathname
                }
            }
        });

    });
    it('switchTutorialEpic selecting geostory_view_tutorial preset for story viewer page, missing presetList', (done) => {
        const NUM_ACTIONS = 1;
        const pathname = '/geostory/newgeostory';
        testEpic(addTimeoutEpic(switchTutorialEpic, 50), NUM_ACTIONS, [
            onLocationChanged({
                pathname
            }),
            initTutorial("", [], {}, null, {}, {})
        ], (actions) => {
            expect(actions.length).toBe(NUM_ACTIONS);
            actions.map((action) => {
                switch (action.type) {
                case TEST_TIMEOUT:
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
                presetList: {
                }
            },
            geostory: {mode: "view"},
            router: {
                location: {
                    pathname
                }
            }
        });

    });
    it('switchTutorialEpic loads correct tutorial for context', (done) => {
        const NUM_ACTIONS = 1;
        const pathname = '/context-creator/new';
        testEpic(switchTutorialEpic, NUM_ACTIONS, [
            onLocationChanged({
                pathname
            }),
            initTutorial("", [], {}, null, {}, {})
        ], (actions) => {
            expect(actions.length).toBe(NUM_ACTIONS);
            actions.map((action) => {
                switch (action.type) {
                case SETUP_TUTORIAL:
                    expect(action.id).toBe("contextcreator_generalsettings_tutorial");
                    expect(action.steps).toEqual({context: "steps"});
                    break;
                default:
                    expect(true).toBe(false);
                }
            });
            done();
        }, {
            tutorial: {
                presetList: {
                    "contextcreator_generalsettings_tutorial": {
                        context: "steps"
                    }
                }
            },
            router: {
                location: {
                    pathname
                }
            }
        });
    });

    describe("tests for switchGeostoryTutorialEpic", () => {
        beforeEach(() => {
            getApi().setItem("mapstore.plugin.tutorial.geostory.disabled", "false");
        });
        const GEOSTORY_TUTORIAL_ID = "geostory";
        const ID_STORY = "1";
        const NUM_ACTIONS = 1;
        it('tests the correct tutorial setup when passing from view to edit (switchGeostoryTutorialEpic)', (done) => {
            const IS_GOING_TO_EDIT_MODE = true;

            testEpic(switchGeostoryTutorialEpic, NUM_ACTIONS, [
                geostoryLoaded(ID_STORY),
                setEditing(IS_GOING_TO_EDIT_MODE)
            ], (actions) => {
                expect(actions.length).toBe(NUM_ACTIONS);
                actions.map((action) => {
                    switch (action.type) {
                    case SETUP_TUTORIAL:
                        expect(action.id).toBe(GEOSTORY_TUTORIAL_ID);
                        expect(action.steps).toEqual(GEOSTORY_EDIT_STEPS);
                        break;
                    default:
                        expect(true).toBe(false);
                    }
                });
                done();
            }, {
                tutorial: {
                    presetList: {
                        'geostory_edit_tutorial': GEOSTORY_EDIT_STEPS,
                        'geostory_view_tutorial': GEOSTORY_VIEW_STEPS
                    }
                }
            });
        });
        it('tests the correct tutorial setup when passing from edit to view (switchGeostoryTutorialEpic)', (done) => {
            const IS_GOING_TO_EDIT_MODE = false;

            testEpic(switchGeostoryTutorialEpic, NUM_ACTIONS, [
                setEditing(IS_GOING_TO_EDIT_MODE)
            ], (actions) => {
                expect(actions.length).toBe(NUM_ACTIONS);
                actions.map((action) => {
                    switch (action.type) {
                    case SETUP_TUTORIAL:
                        expect(action.steps).toEqual(GEOSTORY_VIEW_STEPS);
                        expect(action.stop).toEqual(true);
                        expect(action.id).toBe(GEOSTORY_TUTORIAL_ID);
                        break;
                    default:
                        expect(true).toBe(false);
                    }
                });
                done();
            }, {
                tutorial: {
                    presetList: {
                        'geostory_edit_tutorial': GEOSTORY_EDIT_STEPS,
                        'geostory_view_tutorial': GEOSTORY_VIEW_STEPS
                    }
                }
            });
        });
        it('tests the correct tutorial setup when passing from edit to view, intercepting throw', (done) => {
            const IS_GOING_TO_EDIT_MODE = true;
            setApi("memoryStorage");
            getApi().setAccessDenied(true);
            testEpic(switchGeostoryTutorialEpic, NUM_ACTIONS, [
                setEditing(IS_GOING_TO_EDIT_MODE)
            ], (actions) => {
                expect(actions.length).toBe(NUM_ACTIONS);
                actions.map((action) => {
                    switch (action.type) {
                    case SETUP_TUTORIAL:
                        expect(action.steps).toEqual(GEOSTORY_EDIT_STEPS);
                        expect(action.stop).toEqual(false);
                        expect(action.id).toBe(GEOSTORY_TUTORIAL_ID);
                        break;
                    default:
                        expect(true).toBe(false);
                    }
                });
                done();
                getApi().setAccessDenied(false);
                setApi("localStorage");
            }, {
                tutorial: {
                    presetList: {
                        'geostory_edit_tutorial': GEOSTORY_EDIT_STEPS,
                        'geostory_view_tutorial': GEOSTORY_VIEW_STEPS
                    }
                }
            });
        });
        it('tests when steps are not correctly configured, back off to default (switchGeostoryTutorialEpic)', (done) => {
            const IS_GOING_TO_EDIT_MODE = false;

            testEpic(addTimeoutEpic(switchGeostoryTutorialEpic, 50), NUM_ACTIONS, [
                geostoryLoaded(ID_STORY),
                setEditing(IS_GOING_TO_EDIT_MODE)
            ], (actions) => {
                expect(actions.length).toBe(NUM_ACTIONS);
                actions.map((action) => {
                    switch (action.type) {
                    case TEST_TIMEOUT:
                        break;
                    default:
                        expect(true).toBe(false);
                    }
                });
                done();
            }, {
                tutorial: {
                    presetList: {
                        'default': [{
                            translationHTML: "default",
                            selector: "#intro-tutorial"
                        }]
                    }
                }
            });
        });
        it('does not setup tutorial if it has been disabled (switchGeostoryTutorialEpic)', (done) => {
            const IS_GOING_TO_EDIT_MODE = false;
            getApi().setItem("mapstore.plugin.tutorial.geostory.disabled", "true");

            testEpic(addTimeoutEpic(switchGeostoryTutorialEpic, 50), NUM_ACTIONS, [
                geostoryLoaded(ID_STORY),
                setEditing(IS_GOING_TO_EDIT_MODE)
            ], (actions) => {
                expect(actions.length).toBe(NUM_ACTIONS);
                actions.map((action) => {
                    switch (action.type) {
                    case TEST_TIMEOUT:
                        break;
                    default:
                        expect(true).toBe(false);
                    }
                });
                getApi().setItem("mapstore.plugin.tutorial.geostory.disabled", "false");
                done();
            }, {
                tutorial: {
                    presetList: {
                        'default': [{
                            translationHTML: "default",
                            selector: "#intro-tutorial"
                        }]
                    }
                }
            });
        });
    });
    describe('openDetailsPanelEpic tests', () => {
        it('should open the details panel if it is a (Map) and it has showAtStartup set to true', (done) => {
            const NUM_ACTIONS = 1;

            testEpic(openDetailsPanelEpic, NUM_ACTIONS, closeTutorial(), (actions) => {
                expect(actions.length).toBe(NUM_ACTIONS);
                const [action] = actions;
                expect(action.type).toBe(OPEN_DETAILS_PANEL);
                done();
            }, {
                map: {
                    present: {
                        mapId: "123",
                        info: {
                            attributes: {
                                detailsSettings: {
                                    showAtStartup: true
                                }
                            }
                        }
                    }
                }
            });
        });
        it('should open the details panel if it is a (Dashboard) and it has showAtStartup set to true', (done) => {
            const NUM_ACTIONS = 1;

            testEpic(openDetailsPanelEpic, NUM_ACTIONS, closeTutorial(), (actions) => {
                expect(actions.length).toBe(NUM_ACTIONS);
                const [action] = actions;
                expect(action.type).toBe(OPEN_DETAILS_PANEL);
                done();
            }, {
                dashboard: {
                    resource: {
                        id: "123",
                        attributes: {
                            detailsSettings: {
                                showAtStartup: true
                            }
                        }
                    }
                }
            });
        });
        it('should open the details panel if it is a(Map) and it has showAtStartup set to false', (done) => {
            const NUM_ACTIONS = 1;

            testEpic(addTimeoutEpic(openDetailsPanelEpic, 100), NUM_ACTIONS, closeTutorial(), (actions) => {
                expect(actions.length).toBe(NUM_ACTIONS);
                const [action] = actions;
                expect(action.type).toBe(TEST_TIMEOUT);
                done();
            }, {
                map: {
                    present: {
                        mapId: "123",
                        info: {
                            detailsSettings: {
                                showAtStartup: false
                            }
                        }
                    }
                }
            });
        });
        it('should open the details panel if it is a (Dashboard) and it has showAtStartup set to false', (done) => {
            const NUM_ACTIONS = 1;

            testEpic(addTimeoutEpic(openDetailsPanelEpic, 100), NUM_ACTIONS, closeTutorial(), (actions) => {
                expect(actions.length).toBe(NUM_ACTIONS);
                const [action] = actions;
                expect(action.type).toBe(TEST_TIMEOUT);
                done();
            }, {
                dashboard: {
                    resource: {
                        id: "123",
                        attributes: {
                            detailsSettings: {
                                showAtStartup: false
                            }
                        }
                    }
                }
            });
        });
    });
});
