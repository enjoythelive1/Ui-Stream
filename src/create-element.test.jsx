import {expect} from 'chai';
import sinon from 'sinon';
import {Observable, Subject, of} from "rxjs";
import {map} from "rxjs/operators";
import {marbles} from 'rxjs-marbles/jest'
import createElement from './create-element';
import fragment from './fragment';

/** @jsx createElement */
/** @jsxFrag fragment */

describe('ui-stream', () => {
    describe('createElement', () => {
        describe('when tag is a function', () => {
            it('returns the result of the function', marbles(m => {
                function Component({src, alt}, children) {
                    return (
                        <div className="class">
                            <img
                                src={src.pipe(map(src => src + '.preview.jpg'))}
                                alt={alt.pipe(map(alt => alt + ' preview'))}/>
                                <div>
                                    {children}
                                </div>
                        </div>
                    );
                }

                const image$ = m.cold('--a----b', {
                    a: {
                        src: 'image-1.svg',
                        alt: 'Image 1'
                    },
                    b: {
                        src: 'image-2.gif',
                        alt: 'Image 2'
                    }
                });

                const content$ = m.cold('-12-', {
                    1: 'content 1',
                    2: 'content 2',
                });

                const src$ = image$.pipe(map(({src}) => src));
                const alt$ = image$.pipe(map(({alt}) => alt));

                const description = (
                    <Component src={src$} alt={alt$}>
                        <span id="item">children</span>
                        and other
                        {content$}
                    </Component>
                );

                m.expect(description).toBeObservable('--(wx)-(yz)', {
                    w: {
                        tag: 'div',
                        attributes: {
                            className: 'class'
                        },
                        children: [
                            {
                                tag: 'img',
                                attributes: {
                                    src: 'image-1.svg.preview.jpg',
                                    alt: 'Image 1 preview'
                                },
                                children: null
                            },
                            {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'span',
                                        attributes: {
                                            id: 'item'
                                        },
                                        children: [
                                            'children'
                                        ]
                                    },
                                    'and other',
                                    'content 1'
                                ]
                            }
                        ]
                    },
                    x: {
                        tag: 'div',
                        attributes: {
                            className: 'class'
                        },
                        children: [
                            {
                                tag: 'img',
                                attributes: {
                                    src: 'image-1.svg.preview.jpg',
                                    alt: 'Image 1 preview'
                                },
                                children: null
                            },
                            {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'span',
                                        attributes: {
                                            id: 'item'
                                        },
                                        children: [
                                            'children'
                                        ]
                                    },
                                    'and other',
                                    'content 2'
                                ]
                            }
                        ]
                    },
                    y: {
                        tag: 'div',
                        attributes: {
                            className: 'class'
                        },
                        children: [
                            {
                                tag: 'img',
                                attributes: {
                                    src: 'image-2.gif.preview.jpg',
                                    alt: 'Image 1 preview'
                                },
                                children: null
                            },
                            {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'span',
                                        attributes: {
                                            id: 'item'
                                        },
                                        children: [
                                            'children'
                                        ]
                                    },
                                    'and other',
                                    'content 2'
                                ]
                            }
                        ]
                    },
                    z: {
                        tag: 'div',
                        attributes: {
                            className: 'class'
                        },
                        children: [
                            {
                                tag: 'img',
                                attributes: {
                                    src: 'image-2.gif.preview.jpg',
                                    alt: 'Image 2 preview'
                                },
                                children: null
                            },
                            {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'span',
                                        attributes: {
                                            id: 'item'
                                        },
                                        children: [
                                            'children'
                                        ]
                                    },
                                    'and other',
                                    'content 2'
                                ]
                            }
                        ]
                    },
                })
            }));

            it.todo('memoize the results based on the tag, attributes observables and children observables');
        });
        describe('when tag is a string', () => {
            it('returns an Observable', () => {
                const element = <img src="src"/>;

                expect(element).to.be.instanceOf(Observable);
            });

            describe('returned observable', () => {
                it('emits a node description', marbles(m => {
                    const element = <img src="src"/>;

                    m.expect(element).toBeObservable('(a|)', {
                        a: {
                            tag: 'img',
                            attributes: {src: 'src'},
                            children: null
                        }
                    })
                }));

                describe('node description', () => {
                    it('merges the attribute values observables correctly', marbles(m => {
                        const src = m.cold('--1----2', {
                            1: 'img-small.png',
                            2: 'img-big.png',
                        });

                        const title = m.cold('-ab----c-', {
                            a: 'no Image',
                            b: 'small Image',
                            c: 'big Image',
                        });
                        const alt = 'nice Image';
                        const element = <img src={src} alt={alt} title={title}/>;

                        m.expect(element, '^---------!').toBeObservable('--(wx)-(yz)', {
                            w: {
                                tag: 'img',
                                attributes: {src: 'img-small.png', alt: 'nice Image', title: 'no Image'},
                                children: null
                            },
                            x: {
                                tag: 'img',
                                attributes: {src: 'img-small.png', alt: 'nice Image', title: 'small Image'},
                                children: null
                            },
                            y: {
                                tag: 'img',
                                attributes: {src: 'img-big.png', alt: 'nice Image', title: 'small Image'},
                                children: null
                            },
                            z: {
                                tag: 'img',
                                attributes: {src: 'img-big.png', alt: 'nice Image', title: 'big Image'},
                                children: null
                            },
                        });
                    }));

                    it('maps all subjects as functions', async () => {
                        const mouseMoveEvents = new Subject();
                        const element = <img src="img.png" onMouseMove={mouseMoveEvents}/>;

                        const description = await element.toPromise();
                        expect(description).to.have
                            .nested.property('attributes.onMouseMove')
                            .to.be.a('function');

                        const stub = sinon.stub();
                        mouseMoveEvents.subscribe(stub);
                        description.attributes.onMouseMove('event');

                        expect(stub).to.have.been.calledOnce;
                        expect(stub).to.have.been.calledWith('event');
                    });

                    it('contains all children descriptions', marbles(m => {
                        const element = (
                            <div>
                                <span/>
                                <img src="img.png"/>
                            </div>
                        );

                        m.expect(element, '^-').toBeObservable('(a|)', {
                            a: {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'span',
                                        attributes: {},
                                        children: null
                                    },
                                    {
                                        tag: 'img',
                                        attributes: {src: 'img.png'},
                                        children: null
                                    },
                                ]
                            }
                        })
                    }));

                    it('treats even one element as an array of children', marbles(m => {
                        const element = (
                            <div>
                                <img src="img.png"/>
                            </div>
                        );

                        m.expect(element, '^-').toBeObservable('(a|)', {
                            a: {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'img',
                                        attributes: {src: 'img.png'},
                                        children: null
                                    },
                                ]
                            }
                        })
                    }));

                    it('flattens arrays in children', marbles(m => {
                        const element = (
                            <div>
                                {[
                                    <img src="img.png"/>,
                                    <span>child</span>
                                ]}
                            </div>
                        );

                        m.expect(element, '^-').toBeObservable('(a|)', {
                            a: {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'img',
                                        attributes: {src: 'img.png'},
                                        children: null
                                    },
                                    {
                                        tag: 'span',
                                        attributes: {},
                                        children: [
                                            'child'
                                        ]
                                    }
                                ]
                            }
                        })
                    }));

                    it('can take an observable from observable of child description as child', marbles(m => {
                        const element = <div>{of(<img src="img.png"/>)}</div>;

                        m.expect(element, '^-').toBeObservable('(a|)', {
                            a: {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'img',
                                        attributes: {src: 'img.png'},
                                        children: null
                                    },
                                ]
                            }
                        })
                    }));

                    it('emits when children emits', marbles(m => {
                        const src = m.cold('a-b', {
                            a: 'img-preview.jpg',
                            b: 'img.jpg'
                        });

                        const element = <div><img src={src}/></div>;

                        m.expect(element, '^-').toBeObservable('x-z', {
                            x: {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'img',
                                        attributes: {src: 'img-preview.jpg'},
                                        children: null
                                    },
                                ]
                            },
                            z: {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    {
                                        tag: 'img',
                                        attributes: {src: 'img.jpg'},
                                        children: null
                                    },
                                ]
                            }
                        });
                    }));

                    it('can take any value as children', marbles(m => {
                        const element = (
                            <div>
                                {of('hi')}
                                <img src="img.png"/>
                                stuff
                            </div>
                        );

                        m.expect(element, '^-').toBeObservable('(a|)', {
                            a: {
                                tag: 'div',
                                attributes: {},
                                children: [
                                    'hi',
                                    {
                                        tag: 'img',
                                        attributes: {src: 'img.png'},
                                        children: null
                                    },
                                    'stuff'
                                ]
                            }
                        })
                    }))
                });
            });

            it.todo('memoize the results based on the tag, attributes observables and children observables');
        });
    });
});
