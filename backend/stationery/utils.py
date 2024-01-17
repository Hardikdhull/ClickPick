import os

def upload_display_image(instance, filename):
    return os.path.join('stationery/display-images/', filename)


def printout_rename(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        new_name = '{}.{}'.format(instance.order_id, ext) 

        # when we move the record from active table to past table, then we first delete already present file like this
        for each_file in os.listdir(os.path.join('media/stationery/print-outs')):
            if (each_file == new_name):
                os.remove(os.path.join('media/stationery/print-outs', new_name))

        return os.path.join('stationery/print-outs', new_name)
    else:
        return filename