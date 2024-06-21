module.exports = {
    reporter: 'mochawesome', 
    'reporter-option': [
    'reportDir=report-digitalskola', 
    'reportFilename=[status]_[datetime]-[name]-report',
    'html=true', 
    'json=true', 
    'overwrite=false', 
    'timestamp=longDate', 
    ],
};