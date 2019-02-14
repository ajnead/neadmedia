function originTracer() {
    const uuid = require('uuid/v1');
    const originTraceId = 'endvr-' + uuid();
    return 'originTraceId=' + originTraceId;
}

export default originTracer;