import React from 'react';
import ReactDom from 'react-dom';
import './popup.scss';
const test = <p className="name">Satish1</p>
const root = document.createElement('div');
document.body.appendChild(root);
ReactDom.render(test, root);
