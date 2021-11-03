//os
const os = require('os')

const getOsInfo = () => {
    return {
      uptime: os.uptime(),
      type: os.type(),
      release: os.release(),
      hostname: os.hostname(),
      arch: os.arch(),
      platform: os.platform(),
      user: os.userInfo()
    };
  }

  const getCpuInfo = () => {
	const cpus = os.cpus();
	const load = os.loadavg(); //The load average is a Unix-specific concept. On Windows, the return value is always [0, 0, 0].
	const cpu = {
		load1: load[0],
		load5: load[1],
		load15: load[2],
		cores: Array.isArray(cpus) ? os.cpus().length : null,
	};
	cpu.utilization = Math.min(Math.floor(load[0] * 100 / cpu.cores), 100);

	return cpu;
};

console.log(getOsInfo());
console.log(getCpuInfo());