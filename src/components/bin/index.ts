import { BinProps } from 'interfaces/BinProps';
import { TestBin } from 'components/bin/TestBin';
import { RandomImage } from 'components/bin/RandomImage';
import { Counter } from 'components/bin/Counter';
import { Picker } from 'components/bin/Picker';
import { Theme } from 'components/bin/Theme';
import { Clear } from 'components/bin/Clear';

const bins: { [key: string]: React.FC<BinProps> } = {
  'test-bin': TestBin,
  'random-image': RandomImage,
  counter: Counter,
  picker: Picker,
  theme: Theme,
  clear: Clear,
};

export default bins;
