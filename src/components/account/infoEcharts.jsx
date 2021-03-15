import React, {Component} from 'react';

import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

class InfoEcharts extends Component {
        initEchart() {
            var myChart = echarts.init(document.getElementById('main'));
            myChart.setOption({
                tooltip: {
                    show: false,
                    trigger: 'item',
                    formatter: "{a} <br/>{b}:  ({d}%)"
                },
                legend: {
                    show: true,
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold',
                        color:'rgba(255,255,255,0.6)'
                    },
                    orient: 'vertical',
                    x: 'right',
                    icon: 'circle',
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: true,

                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold',
                            color:'rgba(255,255,255,0.6)'
                        },
                            formatter: '{b}:{c}\n\r({d}%)',
                            position: 'left'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'bold',
                                    color:'#ffffff'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: this.props.optionlist
                    }
                ]
            }, true);
        }

        componentDidMount() {
            if(this.props.optionlist.length){
                this.initEchart()
            }

        }
        render() {
            return (
                <div className="rain">
                    <div className="contentbg list">
                        <div id="main"/>
                    </div>
                </div>

            )
        }
}

export default InfoEcharts;
