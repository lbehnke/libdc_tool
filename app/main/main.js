var electron  = require('electron');
var ref       = require('ref');
var ffi       = require('ffi');
var struct    = require('ref-struct');
var jetpack   = require('fs-jetpack');


var dc_status = {
    DC_STATUS_SUCCESS : 0,
    DC_STATUS_DONE : 1,
    DC_STATUS_UNSUPPORTED : -1,
    DC_STATUS_INVALIDARGS : -2,
    DC_STATUS_NOMEMORY : -3,
    DC_STATUS_NODEVICE : -4,
    DC_STATUS_NOACCESS : -5,
    DC_STATUS_IO : -6,
    DC_STATUS_TIMEOUT : -7,
    DC_STATUS_PROTOCOL : -8,
    DC_STATUS_DATAFORMAT : -9,
    DC_STATUS_CANCELLED : -10
};



var dc_device_t                     = ref.types.void;
var dc_device_t_ptr                 = ref.refType(dc_device_t);
var dc_device_t_ptr_ptr             = ref.refType(dc_device_t_ptr);

var dc_context_t                     = ref.types.void;
var dc_context_t_ptr                 = ref.refType(dc_context_t);
var dc_context_t_ptr_ptr             = ref.refType(dc_context_t_ptr);

var dc_descriptor_t                  = ref.types.void;
var dc_descriptor_t_ptr              = ref.refType(dc_descriptor_t);
var dc_descriptor_t_ptr_ptr          = ref.refType(dc_descriptor_t_ptr);

var iterator_t                       = ref.types.void;
var iterator_t_ptr                   = ref.refType(iterator_t);
var iterator_t_ptr_ptr               = ref.refType(iterator_t_ptr);

var dc_descriptor_iterator_t         = ref.types.void;
var dc_descriptor_iterator_t_ptr     = ref.refType(dc_descriptor_iterator_t);
var dc_descriptor_iterator_t_ptr_ptr = ref.refType(dc_descriptor_iterator_t_ptr);

var libdc = ffi.Library('build/vendor/libdc_tool/native/libdivecomputer', {
    'dc_descriptor_iterator'           : [ref.types.void, [iterator_t_ptr_ptr]],
    'dc_iterator_next'                 : [ref.types.int, [ iterator_t_ptr, dc_descriptor_t_ptr_ptr ]],
    'dc_descriptor_get_vendor'         : [ref.types.CString, [dc_descriptor_t_ptr]],
    'dc_descriptor_get_product'        : [ref.types.CString, [dc_descriptor_t_ptr]],
    'dc_descriptor_get_type'           : [ref.types.uint, [dc_descriptor_t_ptr]],
    'dc_descriptor_get_model'          : [ref.types.uint, [dc_descriptor_t_ptr]],
    'dc_descriptor_get_transport'      : [ref.types.CString, [dc_descriptor_t_ptr]],
    'dc_context_new'                   : [ref.types.int, [dc_context_t_ptr_ptr]],
    'dc_device_open'                   : [ref.types.int, [dc_device_t_ptr_ptr, dc_context_t_ptr, dc_descriptor_iterator_t_ptr, ref.types.CString]],
    'dc_device_set_fingerprint'        : [ref.types.int, [dc_device_t_ptr, ref.types.CString, ref.types.int]]

    //dc_status_t dc_device_set_fingerprint (dc_device_t *device, const unsigned char data[], unsigned int size)

    //dc_status_t status = dc_device_open(&device, context, descriptor, devname);
});

export var listSupportedComputers = function () {
    var list = [];
    var c = 0;
    var iterator_ptr_ptr = ref.alloc(dc_descriptor_iterator_t_ptr_ptr);
    libdc.dc_descriptor_iterator(iterator_ptr_ptr);
    var itertator_ptr = iterator_ptr_ptr.deref();
    var descriptor_ptr_ptr = ref.alloc(dc_descriptor_t_ptr_ptr);
    while(libdc.dc_iterator_next(itertator_ptr, descriptor_ptr_ptr) == dc_status.DC_STATUS_SUCCESS) {
        c++;
        var descriptor_ptr = descriptor_ptr_ptr.deref();
        var vendor = libdc.dc_descriptor_get_vendor(descriptor_ptr);
        var product = libdc.dc_descriptor_get_product(descriptor_ptr);
        var family = libdc.dc_descriptor_get_type(descriptor_ptr);
        var model = libdc.dc_descriptor_get_model(descriptor_ptr);

        console.log(c + ". " + vendor + " " + product + " / family: " + family + " model: " + model);
        list.push({vendor:vendor, product:product, family:family, model:model})
    }
    return list;
};

export var listPorts = function () {

    // TODO list device ports
    return ['COM1', 'COM2'];
}
