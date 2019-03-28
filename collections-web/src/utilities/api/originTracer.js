import Guid from 'guid';

function originTracer() {
    var guid = 'cmui-' + Guid.create();
    return 'originTraceId=' + guid;
}

export default originTracer;