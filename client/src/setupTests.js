import Enzyme from 'enzyme';
//adaptador beta para react 17
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';
import { expect } from '@jest/globals';



Enzyme.configure({ adapter: new Adapter()});
//para ver el componente >> en la carpeta __snapshot__
expect.addSnapshotSerializer(createSerializer({mode:'deep'}));