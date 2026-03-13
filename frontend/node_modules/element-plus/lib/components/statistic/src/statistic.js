'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const statisticProps = runtime.buildProps({
  /**
   * @description Setting the decimal point
   */
  decimalSeparator: {
    type: String,
    default: "."
  },
  /**
   * @description Sets the thousandth identifier
   */
  groupSeparator: {
    type: String,
    default: ","
  },
  /**
   * @description numerical precision
   */
  precision: {
    type: Number,
    default: 0
  },
  /**
   * @description Custom numerical presentation
   */
  formatter: Function,
  /**
   * @description Numerical content
   */
  value: {
    type: runtime.definePropType([Number, Object]),
    default: 0
  },
  /**
   * @description Sets the prefix of a number
   */
  prefix: String,
  /**
   * @description  Sets the suffix of a number
   */
  suffix: String,
  /**
   * @description Numeric titles
   */
  title: String,
  /**
   * @description Styles numeric values
   */
  valueStyle: {
    type: runtime.definePropType([String, Object, Array])
  }
});

exports.statisticProps = statisticProps;
//# sourceMappingURL=statistic.js.map
